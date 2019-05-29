import * as OfflinePluginRuntime from 'offline-plugin/runtime'
import './js/copyButton'
import './js/githubButton'
import './js/localeSelect'

import './app.css'
import './css/iconfont.css'

if (process.env.NODE_ENV === 'production') {
  OfflinePluginRuntime.install()
}
