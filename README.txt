T4T PE TIMER - POWERPOINT CONTENT ADD-IN
========================================

WHAT THIS IS
A reusable PowerPoint content add-in that places a live adjustable countdown timer directly on a slide.

TIMER FEATURES
- Presets: 15 / 20 / 30 minutes
- Custom minutes: 1-180
- Start / Pause / Resume
- Reset
- +1 minute button
- Live MM:SS display
- Progress ring changes to warning colors near the end
- T4T dark neon classroom style

IMPORTANT
PowerPoint Office Add-ins are web apps. The files timer.html, timer.css, timer.js and the icons need to be hosted on HTTPS.
The manifest.xml file points PowerPoint to that hosted timer page.

FASTEST DEPLOYMENT PATH FOR T4T
1. Put the contents of this folder in a small GitHub repo or Railway static site.
2. Deploy it over HTTPS.
3. Edit manifest.xml and replace every occurrence of:
   https://YOUR-HOST.example
   with your actual HTTPS site, for example:
   https://t4t-pe-timer.up.railway.app
4. Put the finished manifest.xml in a trusted Office add-in catalog or sideload it for testing.
5. In PowerPoint: Home > Add-ins > Advanced > Shared Folder, then add T4T PE Timer.
6. Insert the add-in on a PE slide, resize it once, and reuse/copy it on other PE slides.

WINDOWS NETWORK-SHARE SIDELOAD
Microsoft's current test flow is:
- Share a folder on Windows.
- PowerPoint > File > Options > Trust Center > Trust Center Settings > Trusted Add-in Catalogs.
- Add the network path and check Show in Menu.
- Put manifest.xml in that shared folder.
- Restart PowerPoint.
- Home > Add-ins > Advanced > SHARED FOLDER > T4T PE Timer > Add.

NOTES
- Use HTTPS for the hosted timer site.
- This content add-in is meant to be embedded on the slide rather than run only in a task pane.
- Start with one test deck before rolling it into the production course deck.
