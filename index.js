import { getCurrentWindow } from '@tauri-apps/api/window';


const appWindow = getCurrentWindow();

document
  .getElementById('titlebar-minimize')
  ?.addEventListener('click', () => appWindow.minimize());
document
  .getElementById('titlebar-maximize')
  ?.addEventListener('click', () => {
    console.log("minimized")
    appWindow.toggleMaximize()
});
document
  .getElementById('titlebar-close')
  ?.addEventListener('click', () => {
    console.log("close")
    appWindow.close()
});