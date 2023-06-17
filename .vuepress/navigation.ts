import type { NavbarConfig, SidebarConfig } from '@vuepress/theme-default'

export const navbar: NavbarConfig = [
  '/cheetsheet.md',
  '/presentation.md',
  {
    text: 'Repozytorium',
    link: 'https://github.com/drmikeman/spio-docker-workshop',
  },
]

export const sidebar: SidebarConfig = [
  '/intro.md',
  '/first-steps.md',
  '/next-steps.md',
]
