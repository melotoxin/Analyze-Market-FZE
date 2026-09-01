import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QuickConsultationModal } from './QuickConsultationModal';

/**
 * These cover the exact bugs that shipped in this form and were only ever found
 * by hand: it used to fake a success without sending anything, and a failed send
 * showed nothing at all.
 */

vi.mock('canvas-confetti', () => ({ default: vi.fn() }));

const submitLead = vi.fn();
// Mock every export the module has, not just the ones this component uses today,
// so adding an import to the component does not silently break the suite.
vi.mock('../../utils/submitLead', () => ({
  submitLead: (...args: unknown[]) => submitLead(...args),
  WHATSAPP_URL: 'https://wa.me/971563396961',
  ADVISORY_EMAIL: 'contact@amdxb.com',
  openExternal: vi.fn(),
  openAdvisoryWhatsApp: vi.fn(),
  openAdvisoryEmail: vi.fn(),
  buildAdvisoryWhatsAppUrl: vi.fn(),
  buildAdvisoryEmailUrl: vi.fn(),
  formatAdvisoryMessage: vi.fn(() => ''),
}));

const setup = () =>
  render(<QuickConsultationModal isOpen onClose={vi.fn()} lang="en" />);

const fillRequired = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.type(screen.getByLabelText(/full name/i), 'Alexander Vance');
  await user.type(screen.getByLabelText(/phone/i), '+971 56 339 6961');
};

describe('QuickConsultationModal', () => {

  it('sends the lead to the API rather than faking a success', async () => {
    const user = userEvent.setup();
    submitLead.mockReset();
    submitLead.mockResolvedValue(undefined);
    setup();

    await fillRequired(user);
    await user.click(screen.getByRole('button', { name: /send request/i }));

    await waitFor(() => expect(submitLead).toHaveBeenCalledTimes(1));
    expect(submitLead.mock.calls[0][0]).toMatchObject({
      name: 'Alexander Vance',
      phone: '+971 56 339 6961',
      source: 'consultation-modal',
    });
  });

  it('shows the confirmation only after the send resolves', async () => {
    const user = userEvent.setup();
    submitLead.mockReset();
    submitLead.mockResolvedValue(undefined);
    setup();

    await fillRequired(user);
    expect(screen.queryByText(/request received/i)).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /send request/i }));
    expect(await screen.findByText(/request received/i)).toBeInTheDocument();
  });

  it('surfaces an error and does NOT claim success when the send fails', async () => {
    const user = userEvent.setup();
    submitLead.mockReset();
    submitLead.mockImplementation(() => {
      const rejected = Promise.reject(new Error('Could not send your request.'));
      // Mark it handled for the runner's unhandled-rejection tracker. The component
      // still awaits `rejected` and still sees the rejection; this only stops Vitest
      // reporting a legitimately-caught error as an unhandled one.
      rejected.catch(() => {});
      return rejected;
    });
    setup();

    await fillRequired(user);
    await user.click(screen.getByRole('button', { name: /send request/i }));

    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent(/could not send/i);
    // The regression that shipped: a failure must never show the success panel.
    expect(screen.queryByText(/request received/i)).not.toBeInTheDocument();
    // and the visitor is still given a way to reach a human
    expect(alert).toHaveTextContent(/\+971/);
  });

  it('does not submit when required fields are empty', async () => {
    const user = userEvent.setup();
    submitLead.mockReset();
    setup();
    await user.click(screen.getByRole('button', { name: /send request/i }));
    expect(submitLead).not.toHaveBeenCalled();
  });

  it('keeps a preselected package that is not one of the listed services', async () => {
    render(
      <QuickConsultationModal
        isOpen
        onClose={vi.fn()}
        lang="en"
        defaultPackage="Free Zone Inquiry: DMCC"
      />,
    );
    expect(screen.getByRole('combobox')).toHaveValue('Free Zone Inquiry: DMCC');
  });

  it('renders the form in Arabic', () => {
    render(<QuickConsultationModal isOpen onClose={vi.fn()} lang="ar" />);
    expect(screen.getByText('الاسم الكامل *')).toBeInTheDocument();
  });

  it('exposes the dialog with an accessible name', () => {
    setup();
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAccessibleName();
  });
});
