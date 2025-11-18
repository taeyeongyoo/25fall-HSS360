# Visual Novel + Crowd Voting Prototype

This folder contains a zero-dependency visual novel scaffold that runs in any modern browser. It renders a full-screen background, dialogue box, and branching choice buttons. Story beats are defined in `scripts/storyData.js`, so you can focus on authoring scenarios and plugging in the background art you draw. The default script—titled **사씨남정기: 교씨의 변론**—now covers Acts 1 through 5 (“보이지 않는 첩” → “기회의 잉태” → “위험한 속삭임” → route-specific Act 4 decisions → “귀환과 심판”) with three distinct endings. Dialogue appears one sentence at a time; click anywhere in the dialogue box to advance until the screen darkens and the centered choice buttons fade in.

## Run locally

1. Drop your background images into `assets/backgrounds/` (or any folder you like) and point each scene's `background` value to `url('path/to/image.jpg')`.
2. Open `index.html` in your browser. For auto reloads you can serve the folder with any static server, e.g. `npx serve .`.
3. Click through the sample story to verify that options and transitions behave the way you expect.

## Edit the story

- `scripts/storyData.js` holds the `storyGraph` object. Each key is a scene id; update the `label`, `speaker`, `lines` (array of sentences shown sequentially—falling back to `text` if you prefer), and `options` to match your script. Each entry inside `lines` can be either a string or an object shaped like `{ speaker: '사씨', text: '인사한다.' }`; string lines that start with `이름:` automatically set the temporary speaker label (e.g. `사씨: "..."` updates the nameplate for that line).
- Set `background` to either a gradient (default) or an image URL. Images are preloaded automatically so the next scene’s art is ready before the transition.
- Buttons are generated from the `options` array. Give each option a `next` scene id, and (optionally) add `variant: 'secondary'` for subdued buttons.
- When a scene has no options the UI shows a single “Restart story” button. You can change this behavior inside `renderOptions` if you want custom endings.

## Hooking up real-time crowd voting

You can keep this project static (hosted on GitHub Pages) and still let the audience vote together by adding a managed real-time backend such as Firebase Realtime Database, Firestore, Supabase Realtime, or Ably. The easiest free approach is:

1. **Create a shared document/channel** that stores the canonical `currentSceneId`, plus a votes collection for the live poll.
2. **Connect from the browser** using the provider’s CDN script or ES module. After initialization, subscribe to the scene document and call `visualNovelApp.goToScene(sceneIdFromServer)` whenever an update arrives. Every audience device stays in sync because they all react to the same realtime feed.
3. **Record votes** by writing each click to the backend (e.g. incrementing a counter or storing `uid -> choice`). While voting is open, call `visualNovelApp.lockChoices(true)` to freeze the local UI and show the “Voting in progress…” overlay. Once the winning choice is determined (either automatically by the backend or manually by a presenter tool), update the `currentSceneId` in the backend and unlock choices.
4. **Optional presenter controls**: open a hidden admin view (query parameter or a separate page) that displays aggregated counts live and exposes a “push next scene” button. That button simply writes the chosen `sceneId` to the same shared document, which broadcasts to every audience screen.

Because you only serve static files, GitHub Pages remains enough for hosting. The realtime provider handles synchronization without you running your own server.

## Next steps / ideas

- Style the UI to match your art direction (fonts, colors, frame art, etc.).
- Add audio cues (BGM / SFX) by extending `storyGraph` with `music` or `sfx` keys.
- Enhance scene transitions with CSS animations, or fade the dialogue box between lines when you add multi-line conversations.
- Build a timer-driven auto-advance: disable buttons, show a countdown, and auto-pick whichever option has the most votes when the timer ends.
