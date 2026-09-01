import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Footer } from './Footer';

/**
 * The footer callback bar shipped twice broken: first it discarded the number
 * entirely, then it set an error state that was never rendered, so a failed
 * send looked identical to an idle form.
 */

const submitLead = vi.fn();
vi.mock('../../utils/submitLead', () => ({
  submitLead: (...args: unknown[]) => submitLead(...args),
  WHATSAPP_URL: 'https://wa.me/971563396961',
  ADVISORY_EMAIL: 'contact@amdxb.com',
  openExternal: vi.fn(),
  openAdvisoryWhatsApp: vi.fn(),
  openAdvisoryEmail: vi.fn(),
  buildAdvisoryWhatsAppUrl: vi.fn(() => ''),
  buildAdvisoryEmailUrl: vi.fn(() => ''),
  formatAdvisoryMessage: vi.fn(() => ''),
}));

const phoneField = () => screen.getByLabelText(/phone or whatsapp/i);
const submitButton = () => screen.getByRole('button', { name: /request callback|sending/i });

describe('Footer callback bar', () => {
  it('posts the number to the API instead of silently dropping it', async () => {
    const user = userEvent.setup();
    submitLead.mockReset();
    submitLead.mockResolvedValue(undefined);
    render(<Footer lang="en" />);

    await user.type(phoneField(), '+971563396961');
    await user.click(submitButton());

    await waitFor(() => expect(submitLead).toHaveBeenCalledTimes(1));
    expect(submitLead.mock.calls[0][0]).toMatchObject({
      phone: '+971563396961',
      source: 'footer-callback',
    });
  });

  it('shows an error and a phone number when the send fails', async () => {
    const user = userEvent.setup();
    submitLead.mockReset();
    submitLead.mockImplementation(() => {
      const rejected = Promise.reject(new Error('Could not send.'));
      rejected.catch(() => {});
      return rejected;
    });
    render(<Footer lang="en" />);

    await user.type(phoneField(), '+971563396961');
    await user.click(submitButton());

    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent(/could not send/i);
    expect(alert).toHaveTextContent(/\+971/);
  });

  it('does not submit an empty number', async () => {
    const user = userEvent.setup();
    submitLead.mockReset();
    render(<Footer lang="en" />);
    await user.click(submitButton());
    expect(submitLead).not.toHaveBeenCalled();
  });

  it('lists every service as a crawlable link', () => {
    render(<Footer lang="en" />);
    const links = screen
      .getAllByRole('link')
      .filter((a) => (a.getAttribute('href') ?? '').startsWith('/services/'));
    expect(links).toHaveLength(6);
    // The heading count used to be hardcoded to 7 and went stale.
    expect(screen.getByText(/Official Services \(6\)/)).toBeInTheDocument();
  });

  it('uses the office number from the trade licence', () => {
    render(<Footer lang="en" />);
    expect(screen.getByText(/B34-047/)).toBeInTheDocument();
    expect(screen.queryByText(/B34-B047/)).not.toBeInTheDocument();
  });
});
