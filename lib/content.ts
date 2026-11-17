/**
 * Typed access to all site copy. Every piece of content lives in /data/*.json,
 * so text, services, and FAQs can be edited without touching components.
 */
import siteJson from '@/data/site.json';
import servicesJson from '@/data/services.json';
import technologiesJson from '@/data/technologies.json';
import processJson from '@/data/process.json';
import companyJson from '@/data/company.json';
import faqJson from '@/data/faq.json';
import workJson from '@/data/work.json';
import insightsJson from '@/data/insights.json';
import homeJson from '@/data/home.json';

export const site = siteJson;
export const servicesContent = servicesJson;
export const services = servicesJson.services;
export const technologies = technologiesJson;
export const processContent = processJson;
export const company = companyJson;
export const faq = faqJson;
export const work = workJson;
export const insights = insightsJson;
export const home = homeJson;

export type Service = (typeof services)[number];
export type WorkItem = (typeof work.items)[number];
