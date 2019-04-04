# Project 2 @cmda-minor-web · 2018-2019

De ideale werkplek is goed voor de efficiëntie van alle werknemers. Vergaderruimtes zijn als ze niet gebruikt worden fijne ruimtes om in stilte te werken en het zou zonde zijn om deze ruimtes alleen voor vergaderingen te gebruiken. Om het makkelijk te maken om de ideale werkplek te vinden is het handig om in een oogopslag te zien waar die plek is. 
In dit overzicht staan alle ruimtes. Er is aangegeven tot hoe laat hij vrij is, wat de temperatuur is en of het rumoerig is of niet. Daarnaast is er ook een score toe gekend op basis van de licht, co2, luchtvochtigheid, temperatuur en geluid.
Met deze informatie is het makkelijk te zien in welke ruimte het fijn is om te werken.
De score is gebaseerd op de volgende formule
Elke parameter heeft een ideale waarde. De huidige waarde wordt omgerekend tot een cijfer van 1 tot 10 met 5 als ideaal. Alle cijfers worden bij elkaar op gerekend en tot een eindcijfer gerekend met een exponentiële formule. Hierdoor kan een kamer met een temperatuur cijfer van 2 nooit een gemiddeld cijfer van 8 krijgen.

Focus is even een stapje terug. basis van html semantiek, media quarys en PE
serverside versie met js overlay en css enhancements.

## Formule

`((-0.3*((T-20)^2))+10)+(10+(1-10)*((C-0)/(2000-0))(8+(1-8)*((M-2000)/(3600-2000))/3`


T = temperatuur meeting

C = co2 meeting

M = microfoon meeting
