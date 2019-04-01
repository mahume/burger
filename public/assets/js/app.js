$(() => {
    $('.change-devoured').on('click', function(event) {
        let id = $(this).data("id")
        let newDevoured = $(this).data('devoured')

        let newDevouredState = {
            devoured: true
        }
        $.ajax(`/api/burgers/${id}`, {
            type: 'PUT',
            data: newDevouredState
        })
        .then(() => {
            console.log(`Changed devoured to ${newDevoured}`)
            location.reload()
        })
    })
    $('.create-form').on('submit', function(event) {
        event.preventDefault()
        let newBurger = {
            burger_name: $('#burger').val().trim(),
            devoured: 0
        }
        $.ajax('/api/burgers', {
            type: 'POST',
            data: newBurger
        })
        .then(() => {
            console.log('Created new burger')
            location.reload()
        })
    })
    $('.delete-burger').on('click', function(event) {
        let id = $(this).data("id")
        $.ajax(`/api/burgers/${id}`, {
            type: 'DELETE'
        })
        .then(() => {
            console.log(`Deleted burger ${id}`)
            location.reload()
        })
    })
})