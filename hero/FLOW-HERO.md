# Hero background video (Google Flow)

## Current
- **Poster:** `burj-poster.jpg` (Dubai / Burj Khalifa skyline) — used on the homepage now.
- **Video:** off until `burj-hero.mp4` is added.

## Generate with Google Flow (image → video)

1. In Flow, create an **Image to Video** (or Frames to Video) project.
2. Upload `burj-poster.jpg` as the start frame / reference.
3. Use this prompt:

```
Cinematic slow aerial drift over Dubai skyline at golden hour, Burj Khalifa prominent in frame, subtle warm light on glass towers, gentle cloud movement, smooth seamless loop, photorealistic, premium corporate mood, no text, no logos, no people, elegant and calm camera push-in
```

4. Export as MP4 (1920×1080 or wider, 6–10s loop).
5. Save the file here as **`burj-hero.mp4`**.
6. In `HeroCompanyConfigurator.tsx`, enable video:

```tsx
<HeroVideoBackground
  enableVideo
  videoUrl={HERO_VIDEO_URL}
  translateYPercent={progress * 15}
  scale={1 + progress * 0.05}
/>
```

Mobile and reduced-motion users always see the static poster only.
