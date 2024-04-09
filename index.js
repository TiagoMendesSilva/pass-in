
 let attendees = [
  {
    name: "Tiago",
    email: "tiago@tiago.com.br",
    registrationDate: new Date(2024, 2, 22, 19, 20),
    checkinDate: null
  },
  {
    name: "Diego",
    email: "diego@diego.com.br",
    registrationDate: new Date(2024, 2, 23, 19, 00),
    checkinDate: null
  },
  {
    name: "Maria",
    email: "maria@example.com",
    registrationDate: new Date(2024, 2, 24, 18, 30),
    checkinDate: new Date(2024, 2, 27, 20, 45)
  },
  {
    name: "João",
    email: "joao@example.com",
    registrationDate: new Date(2024, 2, 25, 20, 15),
    checkinDate:null
  },
  {
    name: "Ana",
    email: "ana@example.com",
    registrationDate: new Date(2024, 2, 26, 17, 45),
    checkinDate: null
  },
  {
    name: "Pedro",
    email: "pedro@example.com",
    registrationDate: new Date(2024, 2, 27, 19, 55),
    checkinDate: new Date(2024, 2, 30, 22, 20)
  },
  {
    name: "Juliana",
    email: "juliana@example.com",
    registrationDate: new Date(2024, 2, 28, 20, 40),
    checkinDate: null
  },
  {
    name: "Lucas",
    email: "lucas@example.com",
    registrationDate: new Date(2024, 2, 29, 18, 25),
    checkinDate: null
  },
  {
    name: "Carla",
    email: "carla@example.com",
    registrationDate: new Date(2024, 2, 30, 19, 10),
    checkinDate: new Date(2024, 3, 2, 22, 30)
  },
  {
    name: "Fernando",
    email: "fernando@example.com",
    registrationDate: new Date(2024, 2, 31, 21, 20),
    checkinDate: null
  }
]

const createNewAttendee = (attendee) => {
  const registrationDate = dayjs(Date.now()).to(attendee.registrationDate)
  let checkinDate = dayjs(Date.now()).to(attendee.checkinDate)

  if(attendee.checkinDate == null){
   
    checkinDate = ` 
      <button 
        data-email="${attendee.email}"
        onclick="toCheckIn(event)"
      >
        Confirmar check-in
      </button>
    `
  }

  return `
    <tr>
      <td>
        <strong>
          ${attendee.name}
        </strong>
        <br>
        <small>
          ${attendee.email}
        </small>
      </td>
      <td>${registrationDate} </td>
      <td>${checkinDate}</td>
    </tr>
  `
}

const updateList = (attendees) => {

  let output = ""

  for( let attendee of attendees) {
    output = output + createNewAttendee(attendee)   
  }

  //pegar informação do HTML


  //substituir a informação do HTML
  document.querySelector('tbody').innerHTML = output
}


updateList(attendees)

const addAttendee = (event) => {
  event.preventDefault()

  const formData = new FormData(event.target)

  const attendee = {
    name: formData.get('name'),
    email: formData.get('email'),
    registrationDate:  new Date(),
    checkinDate: null
  }

  //verificar se o participante já existe
  const attendeeExists = attendees.find((a) => {
    return a.email == attendee.email
  })

  if(attendeeExists){
    alert(' O e-mail já está cadastrado')
    return
  }

  attendees = [attendee, ...attendees]
  updateList(attendees)

  //Limpar o formulário
  event.target.querySelector('[name="name"]').value = ""
  event.target.querySelector('[name="email"]').value = ""

  
}

const toCheckIn = (event) => {

  //confirmar se realmente quer fazer o check-in
  const confirmationMessage = " Tem certeza que deseja fazer o check-in?"

  if(confirm(confirmationMessage) == false) {
    return
  }

  //encontrar o participante dentro da lista
  const attendee = attendees.find((a) => {
    return a.email == event.target.dataset.email
  })

  //atualizar o check-in do participante
  attendee.checkinDate = new Date()

  //atualizar a lista de participantes
  updateList(attendees)

}