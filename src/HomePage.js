import React, { useState } from 'react';
import { useEffect } from 'react';


import "./styles/HomePage.css"; 
import './signin.js'

import img1 from './images/image-font.jpg';
import img2 from './images/image-font2.jpg';
import img3 from './images/image-font3.jpg';

import pat1 from './images/patient1.jpg';
import pat2 from './images/patient2.jpg';
import pat3 from './images/patient3.jpg';

import us from   './images/us.jpg';





/*Navbar */

function Navbar() {

  /*Home*/
  function scrollToHome() {
    const aboutUsSection = document.getElementById("home");
    if (aboutUsSection) {
      aboutUsSection.scrollIntoView({ behavior: "smooth" });
    }
  }


  /*about-us */
  function scrollToAboutUs() {
    const aboutUsSection = document.getElementById("about-us");
    if (aboutUsSection) {
      aboutUsSection.scrollIntoView({ behavior: "smooth" });
    }
  }

  /*services*/
  function scrollToServices() {
    const aboutUsSection = document.getElementById("services");
    if (aboutUsSection) {
      aboutUsSection.scrollIntoView({ behavior: "smooth" });
    }
  }

  /*testimontail*/
  function scrollToTestimonials() {
    const aboutUsSection = document.getElementById("testimonials");
    if (aboutUsSection) {
      aboutUsSection.scrollIntoView({ behavior: "smooth" });
    }
  }


  /*services*/
  function scrollToContact() {
    const aboutUsSection = document.getElementById("contact");
    if (aboutUsSection) {
      aboutUsSection.scrollIntoView({ behavior: "smooth" });
    }
  }


  return (
    <nav>
      <div className="logo">HomePage</div>
      <div className="search">
        <input type="text" placeholder="Search..." />
        <button>Search</button>
      </div>
      <div className="buttons">
        <button onClick={scrollToHome}>Home</button>
        <button onClick={scrollToAboutUs}>About Us</button>
        <button onClick={scrollToServices}>Our Services</button>
        <button onClick={scrollToTestimonials}>Testimonials</button>
        <button onClick={scrollToContact}>Contact Us</button>
      </div>
      
    </nav>
  );
}




/*Slider */

function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [
    img1,
    img2,
    img3
  ];

  function prevSlide() {
    setCurrentSlide(currentSlide === 0 ? images.length - 1 : currentSlide - 1);
  }

  function nextSlide() {
    setCurrentSlide(currentSlide === images.length - 1 ? 0 : currentSlide + 1);
  }

  function handleClickSignIn() {
    window.location.href = '/signin';
  }

  function handleClickSignUp() {
    window.location.href = '/signup';
  }


 
  return (
    
    <div className="slider" id='home'>
  <img src={images[currentSlide]} alt="Slide" />
  <div className="controls">
    <div className="arrow arrow-left" onClick={prevSlide}>
      <i className="fas fa-arrow-left"></i>
    </div>
    <div className="arrow arrow-right" onClick={nextSlide}>
      <i className="fas fa-arrow-right"></i>
    </div>
  </div>
  <div className="button-container">
        <button className='sign-in' onClick={handleClickSignIn} >Sign In</button>
        <button className='sign-up'onClick={handleClickSignUp} >Sign Up</button>
  </div>
  
</div>


  );
}





/*AboutUsSection */

function AboutUsSection() {
  return (
    <section className="about-us"  id="about-us">
      <h2>About Us</h2>
      <p>Our medical practice has been serving the community for over 30 years. We are committed to providing the highest quality care to our patients, and our team of medical professionals includes experienced doctors, nurses, and support staff.</p>
      <p>Our values include compassion, integrity, and excellence, and we strive to create a welcoming and supportive environment for all of our patients. We believe that every patient deserves personalized care that takes into account their unique needs and circumstances.</p>
      <h3>Meet Our Team</h3>
      <ul className="team-members">
        <li>
          <img src={us} alt="Team member 1" />
          <h4>Dr. John Doe</h4>
          <p>Specialty: Cardiology</p>
        </li>
        <li>
          <img src={us} alt="Team member 2" />
          <h4>Dr. Jane Smith</h4>
          <p>Specialty: Pediatrics</p>
        </li>
        <li>
          <img src={us} alt="Team member 3" />
          <h4>Dr. David Lee</h4>
          <p>Specialty: Oncology</p>
        </li>
      </ul>
    </section>
  );
}


/*ServicesSection */

function ServicesSection() {
  return (
    <section className="services" id='services'>
      <h2>Our Services</h2>
      <ul className="service-list">
        <li>
          <h3>Cardiology</h3>
          <p>We offer a range of cardiology services, including diagnostic testing, treatment for heart disease and heart failure, and lifestyle counseling to help patients manage their condition.</p>
        </li>
        <li>
          <h3>Pediatrics</h3>
          <p>Our pediatricians provide comprehensive care for children from birth through adolescence, including routine check-ups, immunizations, and treatment for acute and chronic illnesses.</p>
        </li>
        <li>
          <h3>Oncology</h3>
          <p>We specialize in the diagnosis and treatment of cancer, and offer a range of options including chemotherapy, radiation therapy, and surgery. We also provide supportive care services to help patients manage symptoms and side effects.</p>
        </li>
      </ul>
    </section>
  );
}




/*TestimonialsSection*/

function TestimonialsSection() {
  
  return (
    <section className="testimonials" id='testimonials'>
      <h2>What Our Patients Say</h2>
      <ul className="testimonial-list">
        <li>
          <img src={pat1} alt="Patient Name" />
          <h3>Patient Name</h3>
          <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget urna euismod, blandit urna in, tempor sem. Donec euismod vel justo eu eleifend."</p>
        </li>
        <li>
          <img src={pat2} alt="Patient Name" />
          <h3>Patient Name</h3>
          <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget urna euismod, blandit urna in, tempor sem. Donec euismod vel justo eu eleifend."</p>
        </li>
        <li>
          <img src={pat3} alt="Patient Name" />
          <h3>Patient Name</h3>
          <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget urna euismod, blandit urna in, tempor sem. Donec euismod vel justo eu eleifend."</p>
        </li>
      </ul>
    </section>
  );
}




/*


function AppointmentForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: Handle form submission logic here
  };

  return (
    <form className="formAppointment" onSubmit={handleSubmit}>
      <h2>Book an Appointment</h2>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </label>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </label>
      <label>
        Phone:
        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
      </label>
      <label>
        Date:
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      </label>
      <label>
        Time:
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
      </label>
      <label>
        Reason for visit:
        <textarea value={reason} onChange={(e) => setReason(e.target.value)} required />
      </label>
      <button type="submit">Book Appointment</button>
    </form>
  );
}

*/




/* GenerateBlog */ 

function GenerateBlog() {
  return (
    <section className="blog" id='blog'>
      <h2>Latest Articles</h2>
      <div className="blog-posts">
        <div className="blog-left" >
          <img src="blog-post-image-1.jpg" alt="Blog post image"/>
          <h3>Why You Should Get a Flu Shot Every Year</h3>
          <p className="meta">By Dr. Jane Smith | November 5, 2022</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque diam at lectus tristique, vitae eleifend purus maximus. Sed quis euismod nibh. Mauris quis nulla vel eros eleifend faucibus at ac eros. Aenean interdum sapien a convallis lobortis.</p>
          <a href="#" className="read-more">Read More</a>
        </div>
        <div className="blog-right">
          <img src="blog-post-image-2.jpg" alt="Blog post image"/>
          <h3>The Benefits of Regular Exercise for Your Mental Health</h3>
          <p className="meta">By Dr. John Doe | October 20, 2022</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque diam at lectus tristique, vitae eleifend purus maximus. Sed quis euismod nibh. Mauris quis nulla vel eros eleifend faucibus at ac eros. Aenean interdum sapien a convallis lobortis.</p>
          <a href="#" className="read-more">Read More</a>
        </div>
      
      </div>
    </section>
  );
}






/*ContactUs*/

function ContactUs() {
  return (
    <section className="contact" id='contact'>
      <div className="containerContact">
        <div className="row">
          <div className="col-md-6">
            <h2>Contact Us</h2>
            <p>
            Get in touch with us ! <br></br>
            If you have any questions, comments, or concerns, we'd love to hear from you. Our team is dedicated to providing exceptional customer service, and we are always here to help. Don't hesitate to reach out to us via phone, email, or our convenient contact form. We look forward to connecting with you and assisting you with whatever you need.
            </p>
            <p>
              <strong>Address:</strong> Technopole of Sfax, PO Box 275, Sakiet Ezzit, 3021 Sfax - Tunisia
            </p>
            <p>
              <strong>Phone:</strong> (216) 53 651 867
            </p>
            <p>
              <strong>Email:</strong> maryem.hadjwannes@gmail.com
            </p>
          </div>
          <div className="col-md-6">
            <div className="map-container">
              <iframe
                title="Google Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3274.7355374551985!2d10.754799874671857!3d34.837741275849346!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1301d19d1c0c0bab%3A0xbf1fffa099f0c850!2sCentre%20de%20recherche%20en%20Num%C3%A9rique%20de%20Sfax!5e0!3m2!1sfr!2stn!4v1681521664441!5m2!1sfr!2stn"
                width="100%"
                height="400"
                frameBorder="0"
                allowFullScreen=""
                aria-hidden="false"
                tabIndex="0"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}




/*Copyright */

function Copyright() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="copyright">
      <p>&copy; {currentYear} Centre de Recherche en Numérique de Sfax. All Rights Reserved.</p>
    </div>
  );
}





/*ChatBoT*/

function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [conversation, setConversation] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const startConversation = () => {
    setConversation([
      {
        speaker: "bot",
        message: "Bonjour! Comment puis-je vous aider aujourd'hui?"
      }
    ]);
  };

  const responsesNokta = ["Docteur, j'ai de terribles pertes de mémoire : que dois-je faire ?- Eh bien, répond le médecin, payez-moi d'avance !", "- Le docteur m'a dit que je serai sur pied en deux semaines...- Et aloirs ? Il avait raison ?- Ouais, j'ai dû vendre ma voiture pour payer sa facture"];
  

  const handleSubmit = (event) => {
    event.preventDefault();
    if (currentMessage.trim()) {
      let message = currentMessage.toLowerCase().trim();
      let response = "";

      if (message === "bonjour"|| message === "salem" || message === "hi" || message === "asslema" || message === "3asslema" || message === "marhba" || message==="ahla" || message === "3asslema" || message === "salut") {
        response = "Bonjour! Comment puis-je vous aider aujourd'hui?";
      } else if (message === "comment ça va ?") {
        response = "Je suis un chatbot, je ne peux pas ressentir d'émotions mais je suis prêt à vous aider !";
      } else if (message === "merci") {
        response = "De rien, c'est mon travail de vous aider !";
      }
        else if (message ==="zaretna el barka"){
        response="Wenti mhall kol barka hhh! ";  

      }else if (message ==="bye"){
        response="besslema! ";  

      } else if (message ==="crns"){
        response="a9wa Centre! ";  

      } else if (message.includes("nokta") || message.includes("dha7akni") || message.includes("wa7da o5ra")) {
        const randomIndex = Math.floor(Math.random() * responsesNokta.length);
        response = responsesNokta[randomIndex];
    
      }else {
        response = "Je ne comprends pas, pouvez-vous reformuler votre question ?";
      }
      
      setConversation([
        ...conversation,
        {
          speaker: "user",
          message: currentMessage
        },
        {
          speaker: "bot",
          message: response
        }
      ]);
      setCurrentMessage('');
    }
  };

  useEffect(() => {
    if (conversation.length === 1 && conversation[0].speaker === "bot") {
      setTimeout(() => {
        setConversation([
          ...conversation,
          {
            speaker: "bot",
            message: "Savez-vous pourquoi l'ordinateur a froid? Parce qu'il a la fenêtre ouverte!"
          }
        ]);
      }, 2000);
    }
  }, [conversation]);

  return (
    <div className={`chatbot-container ${isOpen ? "open" : ""}`}>
      <div className="chatbot-header" onClick={toggleChatbot}>
        <img
          className="chatbot-icon"
          src="https://via.placeholder.com/50x50.png?text=Robot"
          alt="Chatbot Icon"
        />
      </div>
      <div className="chatbot-body">
        {conversation.length === 0 ? (
          <button onClick={startConversation}>Cliquer ici pour commencer</button>
        ) : (
          <>
            <div className="chatbot-messages">
              {conversation.map((message, index) => (
                <div key={index} className={`chatbot-message ${message.speaker}`}>
                  <div className="message-bubble">{message.message}</div>
                </div>
              ))}
            </div>
            <form className="formChat" onSubmit={handleSubmit}>
              <input className="inputChat" type="text" value={currentMessage} onChange={(event) => setCurrentMessage(event.target.value)} />
              <button className="btnChatbot" type="submit">Send</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}











function HomePage() {
  return (
    <>
      <Navbar />
      <Slider />
      <AboutUsSection />
      <ServicesSection/>
      <TestimonialsSection/> 
      <GenerateBlog/>
      <ChatBot/>
      <br></br>
      <ContactUs/>
      <Copyright/>

      
      
      
    </>
  );
}

export default HomePage;
