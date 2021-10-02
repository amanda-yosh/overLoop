const {Client} = require('@notionhq/client');

const client = new Client({
    auth: 'secret_zQKl82dpNjUsidIyhXJxhvX6xtnifDVFbc03PsRYr8r'
}
);

client.databases.retrieve({database_id: '850ae20693204aaeb9771252379f4212'})
.then(resposta => console.log)

