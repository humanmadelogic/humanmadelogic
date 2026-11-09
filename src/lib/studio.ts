import { agency, capabilities, contact, process, workPlaceholder } from '@/config/agency';
import { providerStatus } from './models';

export function studioSnapshot() {
  return {
    name: agency.name,
    tagline: agency.tagline,
    principle: agency.principle,
    email: agency.email,
    location: agency.location,
    contactPath: '/contact',
    mcpPath: '/api/mcp',
    capabilities: capabilities.items.map((item) => ({
      index: item.index,
      title: item.title,
      body: item.body,
      href: item.href,
    })),
    process: process.steps,
    work: {
      status: 'placeholder',
      note: workPlaceholder.note,
    },
    inquiryTopics: contact.topics,
    providers: providerStatus(),
  };
}

export function connectGuide(origin = 'http://localhost:3000') {
  const url = `${origin.replace(/\/$/, '')}/api/mcp`;
  return {
    http: {
      cursor: {
        mcpServers: {
          comlabs: { url },
        },
      },
      claudeDesktop: {
        mcpServers: {
          comlabs: {
            command: 'npx',
            args: ['-y', 'mcp-remote', url],
          },
        },
      },
      chatgpt: url,
    },
    stdio: {
      command: 'npx',
      args: ['tsx', 'src/mcp/stdio.ts'],
    },
  };
}
