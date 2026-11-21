import { ImageResponse } from 'next/og';
import { logoSvgDocument } from '@/lib/logo';
import { getContent } from '@/lib/content';
import { isLocale, defaultLocale } from '@/lib/i18n';

export const alt = 'Virtanex Labs';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const logoSrc = `data:image/svg+xml;base64,${Buffer.from(logoSvgDocument('#E8E0D0')).toString('base64')}`;

/** Social preview card shown when the site is shared. */
export default async function OpenGraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const { site } = await getContent(isLocale(locale) ? locale : defaultLocale);
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'radial-gradient(circle at 50% 0%, #2a1650 0%, #0c0a09 60%)',
          color: '#E8E0D0',
          fontFamily: 'sans-serif',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={800} height={176} alt="" />
        <div style={{ marginTop: 56, fontSize: 38, textAlign: 'center', maxWidth: 900, opacity: 0.85 }}>
          {site.tagline}
        </div>
      </div>
    ),
    size,
  );
}
