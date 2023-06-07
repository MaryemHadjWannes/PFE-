import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importer les fichiers CSS de Bootstrap

function ComposanteProfile() {
  const [photo, setPhoto] = useState(null);
  const [editable, setEditable] = useState(false); // Pour activer/désactiver l'édition des données

  // Fonction appelée lorsqu'une nouvelle photo est sélectionnée
  const handlePhotoChange = (event) => {
    setPhoto(event.target.files[0]);
  };

  // Fonction appelée lorsqu'on clique sur le bouton pour activer/désactiver l'édition des données
  const handleEditableToggle = () => {
    setEditable(!editable);
  };

  return (
    <div className="main-content">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="profile-photo">
              <img src={photo ? URL.createObjectURL(photo) : "placeholder.png"} alt="Profile" />
              <label className="photo-upload-button">
                <input type="file" accept="image/*" onChange={handlePhotoChange} />
                Change photo
              </label>
            </div>
            <div className="profile-name">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <div
                  className={`editable-field ${editable ? 'editable' : ''}`}
                  contentEditable={editable}
                  suppressContentEditableWarning={true}
                >
                  John
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <div
                  className={`editable-field ${editable ? 'editable' : ''}`}
                  contentEditable={editable}
                  suppressContentEditableWarning={true}
                >
                  Doe
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="cin">CIN Number</label>
                <div
                  className={`editable-field ${editable ? 'editable' : ''}`}
                  contentEditable={editable}
                  suppressContentEditableWarning={true}
                >
                  123456789
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="profile-details">
              <div className="form-group">
                <label htmlFor="occupation">Occupation</label>
                <div
                  className={`editable-field ${editable ? 'editable' : ''}`}
                  contentEditable={editable}
                  suppressContentEditableWarning={true}
                >
                  Engineer
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="emails">Emails</label>
                <div
                  className={`editable-field ${editable ? 'editable' : ''}`}
                  contentEditable={editable}
                  suppressContentEditableWarning={true}
                >
                  john.doe@gmail.com
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <div
                  className={`editable-field ${editable ? 'editable' : ''}`}
                  contentEditable={editable}
                  suppressContentEditableWarning={true}
                >
                  123 Main Street, Anytown USA
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="otherDetails">Other Details</label>
                <div
                  className={`editable-field ${editable ? 'editable' : ''}`}
                  contentEditable={editable}
                  suppressContentEditableWarning={true}
                >
                  Additional information here
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <button className="edit-button" onClick={handleEditableToggle}>
              {editable ? 'Save' : 'Edit'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComposanteProfile;