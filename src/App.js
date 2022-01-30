import logo from './logo.svg';
import React, { useRef, useState, useEffect } from 'react';
import { Route, Routes, Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Container, Modal } from 'react-bootstrap';
import ReactSession from 'react-client-session/dist/ReactSession';
import { Typing, TypingStep } from "typing-effect-reactjs";
import { FaWhatsapp } from 'react-icons/fa';
import './App.css';
import './form.css';

function App() {
  ReactSession.setStoreType("localStorage");
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hello" element={<Hello />} />
      </Routes>
    </div>
  );
}

function Home() {
  let audio = new Audio("/Dandelions.mp3");
  const start = () => {
    audio.play()
  }
  let navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [show1, setShow1] = useState(true);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [show4, setShow4] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const handleClose3 = () => setShow3(false);
  const handleShow3 = () => setShow3(true);
  const handleClose4 = () => setShow4(false);
  const handleShow4 = () => setShow4(true);
  const submit = () => {
    ReactSession.set("username", username);
    if (username == '') {
      handleClose1()
      handleShow2()
    } else {
      handleClose1()
      handleShow3()
    }
  }

  return (
    <>
      <main>
        <Modal show={show1} onHide={handleClose1}
          dialogClassName="modal-90w"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          backdrop="static"
          keyboard={false}
        >
          <Modal.Body>
            <div class="login-page">
              <div class="form">
                <h4 className='headerText'>Nama Kamu</h4>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                <button onClick={() => { submit(); start() }}>Lanjut</button>
              </div>
            </div>
          </Modal.Body>
        </Modal>

        <Modal show={show2} onHide={handleClose2}
          dialogClassName="modal-90w"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          backdrop="static"
          keyboard={false}
        >
          <Modal.Body>
            <div class="login-page">
              <div class="form">
                <h4>Isi Namanya</h4>
                <button onClick={() => { handleClose2(); handleShow1() }}>Okayy</button>
              </div>
            </div>
          </Modal.Body>
        </Modal>

        <Modal show={show3} onHide={handleClose3}
          dialogClassName="modal-90w"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          backdrop="static"
          keyboard={false}
        >
          <Modal.Body>
            <div class="login-page">
              <div class="form">
                <h4>Halo, {ReactSession.get("username")} ❤️</h4>
                <button onClick={() => { handleClose3(); handleShow4() }}>Okayy</button>
              </div>
            </div>
          </Modal.Body>
        </Modal>

        <Modal show={show4} onHide={handleClose4}
          dialogClassName="modal-90w"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          backdrop="static"
          keyboard={false}
        >
          <Modal.Body>
            <div class="login-page">
              <div class="form">
                <h4>Sekarang lihat ini ya ❤️</h4>
                <button onClick={() => { navigate('/hello') }}>Okayy</button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </main>
    </>
  )
}

function Hello() {
  const nama  = ReactSession.get("username");
  const url  = 'https://api.whatsapp.com/send?phone=&text=Hai,%20' + nama;
  const sequence = [
    {
      content: "Makasih yo kado ambi ultahe, hari iki kuwe wes ngekek i waktu gae aku pisan walaupun kuwe wedi di golek i wong tuwekmu, dan aku juga mau metu gae nunjukno kegiatanku ndek kerjoan iku lapo ae, dalam artian kuwe ga perlu mikir seng engga engga aku ndek Rogojampi, aku wes nduwe tanggung jawab nek aku ndek kene fokus kerjo, aku pisan wes janji ndek kuwe nek aku ndek kene ngga atene macem macem, aku kadang iso emosi dan aku pisan berusaha gae ngerubah sikapku walaupun iku susah, intine aku sayang kuwe dan aku pisan ngga atene macem macem selama kerjo. Semoga baik baik terus kedepane dan kuwe ojo curiga ndek aku nek aku bakalan main wedok ndek kene, love u nabila ♡",
      config: {
        styleClass: "typing",
      },
    },
    {
      content: 100, // 100ms delay
    },
    {
      content: 200, // 200ms delay
    },
    {
      content: "\nDi ketik : arane januar, untuk: " + ReactSession.get("username"),
      config: {
        styleClass: "typing",
      },
    },
  ];

  return (
    <>
      <img src='/rev.jpg' className='dinoImage'></img>
      <h4 className='textHello'>Halo, {ReactSession.get("username")}!♥</h4>
      <Container className='container'>
        <TypingStep sequence={sequence} styleClass="typing"/>
      </Container>
      <Button className='lanjutButton' variant="success" href={url}><FaWhatsapp /> Lanjut </Button>
    </>
  )
}

export default App;
