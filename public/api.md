# HamsterLab's Polls API Dokumentation  
HamsterLab's Polls bietet eine komplette Web-API um auf Basis dieser Plattform  
Integrationen, Bots und andere Software bauen zu können.  
Bitte beachte die Punkte unter **Standalone-Benutzung** und die **API Nutzungsrichtlinien**  

Diese Dokumentation ist gültig für die Version **1.0** der API.
  
## Hauptendpunkt  
#### `https://polls.hamsterlabs.de/api`  
Alle Daten werden im **JSON Format** bereitgestellt und empfangen.  
  
## Standalone-Benutzung  
Die API ist standardmäßig darauf ausgelegt, Benutzer wiederzuerkennen, um z.b. zu wissen, wer schon wo abgestimmt hat oder nicht.  
Dies wird mithilfe von Fingerprints (hashes der IPs und Browser-Headern) umgesetzt.  
Dafür muss die API direkt Clientseitig angesprochen werden.  
Sollte sie Serverseitig benutzt werden, führt das zu Fehlern, da nun dauerhaft ein Fingerprint  
deiner Anwendung benutzt wird, welcher logischerweise immer derselbe ist, da alle Requests von deinem Server stammen.  
  
Genau dafür gibt es den **Standalone-Modus** der API.  
In dem wird kein oder ein von dir bei jeder Anfrage selbst geschickter eindeutiger Fingerprint verwendet.  
  
### Benutzung des Standalone-Modus  
Hierfür müssten custom HTTP Header in jeder Request mitgegeben werden:  
 `Standalone-API: true`  
 `Custom-Id: <string>`  
  
Der Custom-Id Header kann einen beliebigen String enthalten, den du in deiner Anwendung frei wählen kannst.  
Dieser sollte eindeutig sein und dazu dienen, deine Benutzer zu identifizieren und zuzuordnen.  
Dies kann zum Beispiel bei einem ChatBot die UserId des Chat-Benutzers sein.  
  
## Endpunkte  
  
## GET `/polls`  
Gibt die Übersicht der Startseite, aufgeteielt in *recent* (neuste Abstimmmungen) und *popular* (am meisten gesehene Abstimmungen), zurück.  
  
#### Rückgabedaten:  
- **200: OK**  
```
{ 
  "recent": Array[poll], 
  "popular": Array[poll] 
} 
```
## GET `/polls/:id`  
Ruft eine Abstimmung auf Basis ihrer id ab.  
  
#### URL Parameter:  
- `id` Die eindeutige id der Abstimmung (poll.id)  
  
#### Rückgabedaten:  
- **200: OK**  
  `Poll-Objekt` (Siehe "Das Poll-Objekt") 
  
- **404: Not found**  
  `{ "error": "not_found" }`  
  
## POST `/polls`  
Zum erstellen einer neuen Umfrage  
  
#### Post-Daten (JSON):  
```  
{  
  "title": string (5-50 Zeichen),
  "author": string (4-40 Zeichen),
  "description": string (optional, 30-600 zeichen),
  "options": Array[string] (2-6 Elemente),
  "isPublic": bool (Soll öffentlich gelistet werden?),
  "isMultiple": bool (Mehrere Antworten möglich)
}  
```  
  
#### Rückgabedaten:  
- **200: OK**  
  `Poll-Objekt` mit dem zusätzlichen Feld `"token": string`.  
    Dieser ist der Schlüssel um eine Abstimmung zu löschen oder administrative Änderungen an einer Abstimmung vorzunehmen.  
    Der token sollte abgespeichert werden, da er sonst nicht wieder abgerufen werden kann.  
      
- **422: Unprocessable entity**  
`Validation-Error Objekt` (Siehe "Das Validation-Error Objekt")

## PATCH `/polls/:id/votes`  
Endpunkt für das abstimmen für eine/mehrere bestimmte Optionen.  
  
#### URL Parameter:  
- `id` Die eindeutige id der Abstimmung (poll.id)  
  
#### Post-Daten (JSON):  
``` 
Array[number]
```
Ein Array mit Zahlen, welches die Array-Indexe der jeweiligen Option(en) enthält.  
  
#### Rückgabedaten:  
- **200: OK**  
- **400: Bad request**  
	 `{ "error": "invalid_option" }`  
	 `{ error: 'missing_custom_id_header' }`  
 - **403: Forbidden** 
	  `{ "error": "already_voted" }`   
 - **404: Not found**  
	  `{ "error": "not_found" }`  
- **422: Unprocessable entity**  
`Validation-Error Objekt` (Siehe "Das Validation-Error Objekt")
  
## DEL `/polls/:id/votes`  
Entfernt deine Stimme wieder von einer Abstimmung an der du teilgenommen hast.  
  
#### URL Parameter:  
- `id` Die eindeutige id der Abstimmung (poll.id)  
  
#### Rückgabedaten:  
- **200: OK**  
- **400: Bad request**   
  `{ "error": 'missing_custom_id_header' }` 
- **403: Forbidden**  
  `{ "error": "not_voted" }`   
 - **404: Not found**  
`{ "error": "not_found" }`  
    
## DEL `/polls/:id?token=<token>`  
Löscht eine Abstimmung unwiederruflich.  
  
#### URL Parameter:  
- `id` Die eindeutige id der Abstimmung (poll.id)  
- `<token>` Der token den man dei der erstellung der Abstimmung erhalten hat.  
  
#### Rückgabedaten:  
- **200: OK**   
- **403: Forbidden**  
`{ "error": "not_voted" }`   
 - **404: Not found**  
`{ "error": "not_found" }`  
    
## Das Poll-Objekt  
```  
{  
  "id": string,
  "title": string,
  "author": string,
  "creationDate": ISODateTime,
  "options": Array[string],
  "description": string|null,
  "isPublic": bool,
  "isMultiple": bool,
  "voted": bool (optional),
  "views": number,
  "totalVotes": number,
  "votes": Array[number]
}  
``` 
## Das Validation-Error Objekt
```
{ 
  "error": "validation_error",
  "problems": { 
  "field": { 
    "value": string,
    "msg": string,
    "param": string,
    "location": string 
  }, 
  ... 
} 
```  
  
## API Nutzungsrichtlinien  
1. Das Ausnutzen der API ist untersagt. Dazu zählt:  
   - Spam.  
   - Vollständig autonome Bots die ausschließlich maschinengenerierten Inhalt produzieren.  
   - Das erstellen von Fakedaten und/oder Daten mit rechtswidrigen oder unangemessenen Inhalten.  
   - Das Bereitstellen von Zugriff auf die API durch Dritte.  
      
2. Hinweise für deine Anwendung bei Verwendung unserer API:  
   - Achte auf seriösität und Benutzerfreundlichkeit  
   - Stelle nützliche und sinnvolle Funktionen und Implementationen bereit.