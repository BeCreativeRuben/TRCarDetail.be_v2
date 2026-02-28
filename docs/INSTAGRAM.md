# Instagram-integratie

De site gebruikt Instagram op twee manieren:

1. **Links** – De knop “Volg ons op Instagram” en het icoon in de footer linken naar jullie Instagram-profiel.
2. **Laatste posts** – De sectie “Laatste posts” toont automatisch de **3 meest recente posts** als die via de Instagram Graph API beschikbaar zijn; anders vallen we terug op handmatige shortcodes uit de env.

## Automatisch: 3 meest recente posts (aanbevolen)

Als je **Instagram Graph API** configureert, haalt de site zelf de 3 laatste posts op. Je hoeft dan niets meer aan te passen wanneer je nieuwe posts plaatst.

### Vereisten

- Een **Instagram Business** of **Creator**-account.
- Het account moet gekoppeld zijn aan een **Facebook-pagina**.
- Een **Meta Developer**-app met toegang tot de Instagram Graph API.

### Stappen

1. **Meta Developer-account en app**
   - Ga naar [developers.facebook.com](https://developers.facebook.com/) en maak een app aan (of gebruik een bestaande).
   - Voeg het product **Instagram Graph API** toe aan de app.

2. **Facebook-pagina koppelen**
   - Koppel je Instagram-account aan een Facebook-pagina (Instagram-instellingen → Account center → Pagina’s).

3. **Access token**
   - Gebruik **Facebook Login** of **Graph API Explorer** om een **Page Access Token** te krijgen met de rechten `instagram_basic` en `pages_read_engagement` (of `pages_show_list`).
   - Maak een **langlevende** token als je niet telkens opnieuw wilt inloggen ([documentatie](https://developers.facebook.com/docs/facebook-login/guides/access-tokens/get-long-lived)).

4. **Instagram User ID**
   - De Graph API werkt met een **Instagram User ID** (niet je gebruikersnaam).
   - Haal die op via:  
     `GET https://graph.facebook.com/v21.0/{page-id}?fields=instagram_business_account&access_token=...`  
     De `page-id` is het ID van de gekoppelde Facebook-pagina. In het antwoord staat `instagram_business_account.id`; dat is je **Instagram User ID**.

5. **Env-variabelen** (alleen op de server, niet `NEXT_PUBLIC_`):

In `.env.local`:

```env
INSTAGRAM_ACCESS_TOKEN=jullie_page_access_token
INSTAGRAM_USER_ID=jullie_instagram_user_id
```

Na het herstarten van de dev/build haalt de site automatisch de 3 laatste posts op (respons wordt 5 minuten gecached).

---

## Fallback: handmatige shortcodes

Als je **geen** Graph API wilt gebruiken, kun je de te tonen posts handmatig instellen met shortcodes.

- Post-URL: `https://www.instagram.com/p/SHORTCODE/` → de shortcode is het deel na `/p/`.
- In `.env.local`:

```env
NEXT_PUBLIC_INSTAGRAM_POST_SHORTCODES=shortcode1,shortcode2,shortcode3
```

De sectie “Laatste posts” doet eerst een request naar `/api/instagram-posts`. Als die API geen shortcodes teruggeeft (bijv. omdat `INSTAGRAM_ACCESS_TOKEN` en `INSTAGRAM_USER_ID` niet gezet zijn), worden de shortcodes uit `NEXT_PUBLIC_INSTAGRAM_POST_SHORTCODES` gebruikt. Als ook die ontbreken, worden de standaard placeholders in de code gebruikt.

---

## Profiel (handle)

Standaard: `trcar_detail`. Voor een ander account:

```env
NEXT_PUBLIC_INSTAGRAM_HANDLE=jullie_handle
```

---

## Overzicht

| Doel | Variabele | Opmerking |
|------|-----------|-----------|
| Automatisch laatste 3 posts | `INSTAGRAM_ACCESS_TOKEN` + `INSTAGRAM_USER_ID` | Server-only; Graph API |
| Handmatige posts (fallback) | `NEXT_PUBLIC_INSTAGRAM_POST_SHORTCODES` | Komma-gescheiden |
| Profiel-link | `NEXT_PUBLIC_INSTAGRAM_HANDLE` | Standaard: `trcar_detail` |

---

## Embed-beperkingen

Instagram kan embed-iframes beperken (“Content niet beschikbaar” of alleen na inloggen). Dat is beleid van Meta. Zorg dat de posts **openbaar** zijn. Als embeds toch niet werken, overweeg een externe widget (bijv. EmbedSocial, Curator) of toon alleen de link naar het profiel.
