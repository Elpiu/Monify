
trovata soluzione più efficace e semplice google form

manca upvote e downvote


Form
https://docs.google.com/forms/d/e/1FAIpQLScUFYKbbhRb7EcQy5n_CZP3DZj--TaB3-AeOh6Zcr8W9xzA3g/viewform?usp=dialog

Sheet
https://docs.google.com/spreadsheets/d/1pnit8F4YsQYH3YIE2DRmM2qcIBFuE0NIxAxzAyBiLPI/edit?resourcekey=&gid=437977746#gid=437977746

-- API

GET ALL DATA
https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLhx8R3iw42kGxRrMhSSsUCZ62wQvia2tzTau4BazsOHvf6EjgvDj00gP9d6oKYRJF4aaJdQZjsiABXN-BUtxROHR51MCETOYyYSsRDeTDNvPl-8c7UL6q1vHffELvOK7qqkb5Pw-SNkJhwrM8ttZjgAEbIVcRUFpzDU2qia_6AW6PkGgbF2UbC293JQAkIaY0XDzJ99-GNGVihmoq_o132QJe7DnBuEgP0cz4V3MTVnRyXaJp8i8lxSB279xl0KqnGTK7lMeq2usgxTsW4uPK_GR1nMeQ&lib=Mawc6q0_pqWWuz-GGfrNT9FcS5nMHOPhy

SUBMIT 

@googleAppsScriptId = AKfycbwQwQz1uccnPdePYed8UFhcYb7d51A7FuOIfYlJv3llOfXrtyndUSC8zsAr4_2Vz8Xk


POST https://script.google.com/macros/s/{{googleAppsScriptId}}/exec

Content-Type: application/json

{
    "rowId": 3,
    "voteType": "upvote"
}