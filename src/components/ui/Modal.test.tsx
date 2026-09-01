import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { Modal } from './Modal';

/**
 * Regression cover for a focus bug that shipped: Modal's effect depended on
 * `onClose`, which callers do not memoise, so it was a new function on every
 * render. Every keystroke tore down the focus trap and its cleanup handed focus
 * back to the page — typing in any modal dropped focus after one character.
 */
function Harness() {
  const [value, setValue] = useState('');
  // Deliberately NOT memoised: this is what real callers pass.
  return (
    <Modal isOpen onClose={() => {}} title="Test dialog">
      <label htmlFor="field">Field</label>
      <input id="field" value={value} onChange={(e) => setValue(e.target.value)} />
    </Modal>
  );
}

describe('Modal', () => {
  it('keeps focus in the field across re-renders while typing', async () => {
    const user = userEvent.setup();
    render(<Harness />);

    const field = screen.getByLabelText('Field') as HTMLInputElement;
    await user.click(field);
    await user.keyboard('Alexander');

    expect(field.value).toBe('Alexander');
    expect(document.activeElement).toBe(field);
  });

  it('closes on Escape', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(
      <Modal isOpen onClose={onClose} title="Test dialog">
        <p>body</p>
      </Modal>,
    );
    await user.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalled();
  });

  it('exposes dialog semantics and an accessible name', () => {
    render(
      <Modal isOpen onClose={vi.fn()} title="Book a consultation" subtitle="Sub">
        <p>body</p>
      </Modal>,
    );
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAccessibleName('Book a consultation');
    expect(screen.getByRole('button', { name: /close dialog/i })).toBeInTheDocument();
  });

  it('locks body scroll while open and restores it on unmount', () => {
    const { unmount } = render(
      <Modal isOpen onClose={vi.fn()} title="Test dialog">
        <p>body</p>
      </Modal>,
    );
    expect(document.body.style.overflow).toBe('hidden');
    unmount();
    expect(document.body.style.overflow).not.toBe('hidden');
  });

  it('renders nothing when closed', () => {
    render(
      <Modal isOpen={false} onClose={vi.fn()} title="Test dialog">
        <p>body</p>
      </Modal>,
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
