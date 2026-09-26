# Certificate images

Drop certificate images here and they appear automatically in the certificate modal —
no code changes needed. Expected filenames (JPG, ~1200px wide, under 300KB each):

| File | Certificate |
|---|---|
| `pinnacle.jpg` | Pinnacle Labs — Certificate of Internship |
| `thm-presec.jpg` | TryHackMe — Pre Security |
| `google-foundations.jpg` | Google — Foundations of Cybersecurity |
| `google-risks.jpg` | Google — Play It Safe: Manage Security Risks |
| `isa-summer.jpg` | India Space Academy — Summer School |

Until a file exists, the modal shows a styled "Certificate image coming soon" placeholder.
To add a new certificate: add a card in `index.html` (copy an existing `.cert-card`, set a
new `data-cert` key) and a matching entry in the `certs` object in `script.js`.
