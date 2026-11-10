'use client';

import { type ServiceDefinition } from '@/config/services';
import { hasExpandedServiceContent } from '@/lib/hml/serviceExpanded';
import { ServiceExpandedView } from './ServiceExpandedView';
import { ServiceLegacyView } from './ServiceLegacyView';

type Props = {
  service: ServiceDefinition;
};

export function ServiceView({ service }: Props) {
  if (hasExpandedServiceContent(service)) {
    return <ServiceExpandedView service={service} />;
  }
  return <ServiceLegacyView service={service} />;
}
