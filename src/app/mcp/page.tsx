import type { Metadata } from 'next';
import { HmlPageShell } from '@/components/hml/HmlPageShell';
import { McpView } from '@/components/hml/McpView';
import { mcp } from '@/config/agency';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'MCP',
  description: mcp.body,
  path: '/mcp',
  noindex: true,
});

export default function McpPage() {
  return (
    <HmlPageShell>
      <McpView />
    </HmlPageShell>
  );
}
