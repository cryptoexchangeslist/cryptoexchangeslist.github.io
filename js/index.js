
function make_href(url, text) {
    return '<a href="' + url + '" target="_blank">' + text + '</a>';
}

function currency_to_float(currency_string) {
    currency_string.replace(/[$,]+/g, "");
    return parseFloat(currency_string);
}

fetch('js/data.json')
    .then((response) => response.json())
    .then((res) => {
        data = res.data

        console.log(data.length)
        x = $('#exchanges').DataTable({
            "data": data,
            columns: [{
                data: 'exchange',
                "render": function (data, type, row, meta) {
                    return make_href(row.url, data);
                }
            }, {
                data: 'max_maker_fee'
            }, {
                data: 'max_taker_fee'
            }, {
                data: 'fiat_deposits'
            }, {
                data: 'fee_volume_discounts'
            }],
            paging: false,
            searching: false,
            info: false,
            responsive: {
                details: {
                    type: 'column',
                    target: 'tr'
                }
            },
            "order": [
                [2, "asc"],
                [3, "desc"]
            ]
        });

        // Create cards

        // sort cards
        function compare(a, b) {
            a_deadline = new Date(a.deadline)
            b_deadline = new Date(b.deadline)
            a_prize = currency_to_float(a.prize);
            b_prize = currency_to_float(b.prize);
            if (a_deadline < b_deadline) {
                return -1;
            } else if (a_deadline > b_deadline) {
                return 1;
            } else {
                if (a_prize > b_prize) {
                    return -1;
                } else if (a_prize < b_prize) {
                    return 1;
                } else {
                    return 0;
                }
            }
        }

        data.forEach(elt => {
            let card = document.createElement("div");
            card.className = 'card text-center mt-4';

            // card body
            let card_body = document.createElement('div');
            card_body.className = 'card-body';

            let card_title = document.createElement('h4');
            card_title.className = 'card-title';
            card_title.innerHTML = elt.exchange;

            let card_text = document.createElement('p');
            card_text.className = 'card-text';
            card_text.innerHTML = 'Max taker fee: ' + elt.max_taker_fee + '<br />';
            card_text.innerHTML += 'Max maker fee: ' + elt.max_maker_fee;

            let card_link = document.createElement('a');
            card_link.className = 'btn btn-link';
            card_link.href = elt.url;
            card_link.innerHTML = 'Trade Now';

            card_body.appendChild(card_title)
            card_body.appendChild(card_text)
            card_body.appendChild(card_link)

            // Card footer
            let footer = document.createElement('div');
            footer.className = 'card-footer text-muted';

            card.appendChild(card_body);
            card.appendChild(footer);
            document.getElementById('contests-cards').appendChild(card);
        });


    })


