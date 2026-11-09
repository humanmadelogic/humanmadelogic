import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { AdminDashboard } from '@/components/hml/AdminDashboard';
import { AdminLogin } from '@/components/hml/AdminLogin';
import { HmlPageShell } from '@/components/hml/HmlPageShell';
import { admin } from '@/config/agency';
import { ADMIN_COOKIE, verifyAdminToken } from '@/lib/admin-auth';
import { listInquiries } from '@/lib/inquiries';
import { mailDiagnostics } from '@/lib/mailer';
import { providerStatus } from '@/lib/models';
import { buildMetadata } from '@/lib/seo';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = buildMetadata({
  title: 'Studio',
  description: admin.body,
  path: '/admin',
  noindex: true,
});

export default async function AdminPage() {
  const token = cookies().get(ADMIN_COOKIE)?.value;
  const authed = verifyAdminToken(token);

  if (!authed) {
    return (
      <HmlPageShell>
        <AdminLogin />
      </HmlPageShell>
    );
  }

  const inquiries = await listInquiries();

  return (
    <HmlPageShell>
      <AdminDashboard
        inquiries={inquiries}
        providers={providerStatus()}
        mail={mailDiagnostics()}
        endpoint="/api/mcp"
      />
    </HmlPageShell>
  );
}
