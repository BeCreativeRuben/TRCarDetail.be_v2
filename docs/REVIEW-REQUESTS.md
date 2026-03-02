# Automatische review-aanvraag na afspraak

Na de **dag van de afspraak** stuurt de site automatisch een e-mail naar de klant met het verzoek om een review achter te laten.

## Hoe het werkt

1. **Bij boeking**  
   De klant en info@trcardetail.be krijgen (zoals nu) een bevestiging. De boeking wordt daarnaast opgeslagen in **Vercel KV (Redis)** met een vlag `reviewRequestSent: false`.

2. **Dagelijks (cron)**  
   Elke dag om **09:00 UTC** (10:00 of 11:00 Belgische tijd, afhankelijk van zomer/wintertijd) roept Vercel de route `/api/cron/review-requests` aan. Die route:
   - Haalt alle opgeslagen boekingen op waarvan de **afspraakdatum (preferredDate) vóór vandaag** ligt;
   - Filtert op boekingen waar nog **geen** review-mail is verstuurd;
   - Stuurt naar die klanten een e-mail “Hoe was uw ervaring?” met een link naar het contactformulier;
   - Zet voor die boekingen `reviewRequestSent: true`, zodat ze niet opnieuw een mail krijgen.

Elke klant krijgt dus **maximaal één** review-aanvraag per afspraak, de dag na (of later na) de afspraakdatum.

## Wat je moet instellen

### 1. Redis (Vercel KV / Upstash)

De boekingen worden opgeslagen in **Redis**. Zonder Redis worden bevestigingsmails gewoon verstuurd, maar er worden geen review-mails na de afspraak gestuurd.

- Ga in het **Vercel-dashboard** naar je project → **Storage** of **Integrations**.
- Voeg een **Redis**-store toe (bijv. **Upstash Redis** uit de Marketplace).  
  Vercel zet dan o.a. `KV_REST_API_URL` en `KV_REST_API_TOKEN` voor je.

Als die variabelen gezet zijn, slaat de site bij elke boeking ook een record op voor de review-cron.

### 2. Cron beveiligen (aanbevolen)

Zodat niet zomaar iedereen de cron-URL kan aanroepen:

- In Vercel: **Project → Settings → Environment Variables**
- Voeg een geheim toe, bijv. **`CRON_SECRET`** (lange, willekeurige string).
- De cron-aanroep van Vercel stuurt dan `Authorization: Bearer <CRON_SECRET>`. Als `CRON_SECRET` gezet is, weigert de route aanroepen zonder dit token.

### 3. Optioneel: site-URL in de e-mail

In de review-e-mail staat een knop “Review achterlaten” die naar het contactformulier linkt. Standaard: `https://trcardetail.be`.

Als je een andere domein gebruikt, zet dan in Vercel (of `.env.local`):

- **`NEXT_PUBLIC_SITE_URL`** = bijv. `https://www.jouwdomein.be`

## Samenvatting

| Onderdeel        | Vereiste / gedrag |
|------------------|-------------------|
| Bevestigingsmails bij boeking | Werken zoals nu (SMTP) |
| Opslaan boekingen | Redis (KV) – anders geen review-mails |
| Review-mail na afspraakdag | Cron + Redis + SMTP |
| Beveiliging cron | Stel `CRON_SECRET` in |

Zonder Redis blijft alles werken; alleen de automatische review-mail na de afspraak wordt dan niet uitgevoerd.
