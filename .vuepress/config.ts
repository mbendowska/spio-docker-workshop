import { defaultTheme } from '@vuepress/theme-default'
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
import { searchPlugin } from '@vuepress/plugin-search'
import fa from 'markdown-it-fontawesome'
import regexp from 'markdown-it-regexp'
import { path } from '@vuepress/utils'
import { navbar, sidebar } from './navigation'

export default {
  lang: 'pl-PL',
  title: 'Docker - warsztaty',
  description: 'Studium Podyplomowe Inżynierii Oprogramowania',

  theme: defaultTheme({
    navbar: navbar,
    sidebar: sidebar,
    logo: './docker.webp',
    contributors: false,
    lastUpdated: false,
  }),

  head: [
    ['link', { rel: 'icon', href: '/docker.webp' }],
    ['script', { src: 'https://use.fontawesome.com/releases/v5.15.4/js/all.js' }],
    ['link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css' }]
  ],

  plugins: [
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, './components'),
    }),
    searchPlugin(),
  ],

  extendsMarkdown: (md) => {
    md.use(fa)
    md.use(regexp(
      /\:bi-([\w\-]+)\:/,
      function (match, utils) {
        return '<i class="bi-' + utils.escape(match[1]) + '"></i>';
      }
    ))
  }
}
