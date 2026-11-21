export type InquiryErrorCode = 'invalid' | 'rate' | 'send' | 'network' | 'generic';

/** Carries a machine-readable code; the form shows the matching message from ui.errors. */
export class InquiryError extends Error {
  constructor(public code: InquiryErrorCode) {
    super(code);
  }
}

/** Client helper: posts a form to /api/inquiry. Throws InquiryError on failure. */
export async function submitInquiry(payload: Record<string, string>) {
  let response: Response;
  try {
    response = await fetch('/api/inquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new InquiryError('network');
  }

  const data = (await response.json().catch(() => null)) as { ok?: boolean; code?: InquiryErrorCode } | null;
  if (!response.ok || !data?.ok) throw new InquiryError(data?.code ?? 'generic');
}
