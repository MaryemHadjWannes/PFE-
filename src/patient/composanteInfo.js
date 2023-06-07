import React, { useState } from 'react';

import './composanteInfo.css';
import { left } from '@popperjs/core';

function MonFormulaire()  {

  

  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [codeCnam, setCodeCnam] = useState('');
  const [numCin, setNumCin] = useState('');
  const [resultatVaccination, setResultatVaccination] = useState('');
  const [photo, setPhoto] = useState(null);

  const handleNomChange = (event) => {
    setNom(event.target.value);
  };

  const handlePrenomChange = (event) => {
    setPrenom(event.target.value);
  };

  const handleCodeCnamChange = (event) => {
    setCodeCnam(event.target.value);
  };

  const handleNumCinChange = (event) => {
    setNumCin(event.target.value);
  };

  const handleResultatVaccinationChange = (event) => {
    setResultatVaccination(event.target.value);
  };

  const handlePhotoChange = (event) => {
    setPhoto(URL.createObjectURL(event.target.files[0]));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Enregistrer la carte ici
  };

  const handleEnvoyerAuPatient = () => {
    // Envoyer la carte remplie au patient ici
  };

  return (
    <div className="main-content">
          <div className="containerProfile">         
        
      <div className="row gutters">
        <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
          <div className="cardProfile h-100">
            <div className="card-body">
              <div className="account-settings">
                <div className="user-profile">
                  <div className="user-avatar">
                    <img 
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAABcVBMVEUiqFv///+vSxn5xaIzMzvlupyySBYUrF2EcDT7yKUAokzTPT36xaIAo0//xqWqQAAAplasRQ7iRES1RBPqvp8qLTerQwj4wZvz+vbe8OWi1bUdJTLv+PMLrV4jKTUtLznH5dKPzaY2r2i33sVZuX7Z7uFsv4vkpIDqs44hISwoql9/xZjG5dKZXymVYyu94cq0VCW+fE3Tl27UjGYqKjNFsnB2w5ODyJyd07E7o1lVkEtphEOJbDKhVyJ2fD1Vt3vBbEPLfVZ9djm7YDXJil7gNTrQLDLbpoZlr23AnYfKooifhHTAvI1US0vSv5OvuYZpWVSvsa+Cg4KfWSRgikepTxxLlU5Am1JvgEDFckroqobobGDyoYfqemv1r5LlWFLnh3OiTyqRSCmCSTVxQjNfRT9IODo+P0MEJDabeWiukmOatn+Db2ReU1GEs3e4uorOyqbm2L/t6Nns3cjry6tjZWeKjIvT1dOkpaTa29kRDx/de/Q1AAASBklEQVR4nM2diVvbRhOHZXxFrozlYGxDAgYbMJDQEG5yfIGQixAaINAm5GiapqVtmvQKOfjrv13JkiXtIWl2RDJ9+kCMj309s7/ZnV2ttFTiVh8Yaa2MLi+NLS42m9Pa9HSzuTg2cWF0sDUyfj75j9eSfPOBSysTTa1YKBZNYprPyANF8hdtcWKlNZ5kI5IiHGgtLxYKxSAXxwhpobC43BpIqCVJEA60JjQCF8rm4ywWtLHBJCjRCS8uTcel81IuXawjNwiVsN6aKALpupTFiRaq/iASXhqDOo9x5VgLr1lYhOMXVL3ns2JxCUtgcQhbiwVEPMvMQnMQpW0IhAPLJK0lYcXCMoK4KhOOT6C7r2tmYUI5WBUJx28kyGcz3lBkVCIcHyskimebIqMC4cDEafBZjGMK/RFMWL+QcHx6zSwsgUcBUMLBCGNqVMbiyqkSjjSTyQ8yK06PnB7h0ml1QL8Vlk6J8OIpB2jXTPPiaRB+IQfaBnBjXMIR7Us50DZTi9sbYxKOfkkH2lYYTZDw/OLpSyhrxcVYuTEO4ZeTGL+ZZpxIjUG48uUj1LE4kRqdcOJriFDHimPohOebX0eEOmY2o3bGiITjag7MUxvSpldt0/JD1iNK71mMOKeKRjiiAEhIVq9cvXlt5uCgJ5fr68v15XoOrs9cu/l4/wclzGI0vYlE2IJqDPHblTOPKBaxHq/RB/r6+h6d2V8dgkIWItUcoxAOAgHzq48JXQCtJwDal5u5qgE9WYhSjYtACMsS+fz+jJzOpezr+/YKjDFK1ggnhA3U8lcP+qLgOZDX95NCDCUEAQ7tH/RFxrOt72B/KBHEMEJIiOZXZ+LyWYwzqwA/hiKGEEJEZuhqpO7HWi53BeDGQkgBR04ISRP5axAHdtx4E+JFuaJKCS9C+iAoQl3EbyGIl6CE4xDA67AIdSz3CPCZBdkATkJ4HjJUUwSkiAAvmpJhuISwGf+T8jOqgAQREqhNCOFY/OnS0BmVPuhY3834imqK54tCwpX4MZrfxwAkiFdif7RWHI1LCJHRVfUQ7Vj8z9YKomKxgPA8YEY/9C0WYe4aIPOL1EZAuAggvIITo9T6vo//8dpiHMJRQKLIH6AB9uSuA5wo6IpcwhHIYO0qngup2EDGNtyyBpcw/pvjuhCY9zU+DOexCUjhEClTOAbqieZENMJLoDnvdVRAMrIBzYc5Y3AOIahy+AOuC4kTIa3QTHbvJku4BInR/P/Qsn3Hcv+D9EROnDKEoCmTlkcOUmLXYaUpRk8ZQsCMQksgSEmY/gBqyXQY4SCoF+IHKQnTxyAnFoM1jQBhHbZAMfQoAcIZiJoSxLqU8AJwDQ0/SKFqqplLMsIB4AoF4qDbQwhJ+sQKAxJC0GiGdMOb+EEKzRfMfN9HCMsUOOUZDiGkYEPNX3rzEd6AvaOmoY66XTuALizeEBFCXaitJtENSUdcBbbHl/a9hFAX5hMRGrjU+J3oIQS7MP8Y3A03ZH/MXQWvf49zCYFCSgjPQAlL7aqMELJOY5l3AN4lhOZCBSktr+tlGSFUTH05sUu4DN4SNASU0vJsWn8iQcw9go3biJkXWMI6fNdaHubC8mxN1ydLsqeACbVCnSGETSpsAxGWnqT1dFqflyDm4E3qTjFcQti80DJIOqzOtgkfMX1NLDbghKh5VqMcQnCqIPZ9XMJyqWcubQNSRKEXgZNgy9yE4RCCqjMdi5fwy9XSWlt3+CjiuggRsgjlmDuJcghVtubFKJVSvLmal48iHs7yGUGVb8eKfsJLKrsroxGWy6XS7Ho7iGch6u3ZEidt9O0rtKp4yUcIWPB1LX81TEvLxHU9a/OHhI7Fcxg3StUgJHzYRm3MS6iQDKXDUopWKm88mW9P6kI6h7E2v1byexJYjOpY4byHsKUSpEHCctkCq/bMUjTLcXK4LqRxOL9RxiIstjyE4EG3ReirYRCs9XkCNllL65HZPJB6ras68KG3ZWNdQmAN0SH0TC1KumOxwHyQHsIzSoR2XdEivIhCWCadqGSAyTyE5U53VCW85BKqpHuXsDRfWyuXasqEtVJ5rWaPVhUJ7aRvEU6rvE+HsDpPhGK2dAgPz44LD0s9pDvOldQJ7TUMSgif+3oIN+hEoV1qKxPa76FvIBBa82BNceLkEJbnKZpeRvBh2Xqn+bI6oTWF0lRzRYewajtPQUNdRPuNSLAqE1rlGkqo9C4dwtKkOpuPcxKB0NqcoSl3w2QI0yiEtCNqikO2r5uQZkRNpcjmJVSWGL/hRKm5bBEuqr2LT2nwCDGUxtrNRwhVL361Ced5hPqtuTBwfe4W95VzVQzCAiVUFZpOPlznokxOhnqL/xSUfGhJjaZWwOgSrgUIa56GizAlT7GK4eqERGq01IrqBb72qG02UF1qX3anGZOXuUKrk8fdf1wO9GOUURuRmhVCqDiicUfewVmF1Xq72ZP8OZVhA+o8HxpVHMIJQqgqpR1CfrqA9kNLShEIiZhqqmM2h7DME1OwllpSikFI+NQqGB7CoNRY/zS6v/Lo0u5zgi+2Vt0QCIt1TTlZOHP8qr+Rk3Pd3+f4sSp5ir1yikBYGNBULrX3Efo7oj55y/29dktAeKurTrd8cmt3QxQfjmiq426XMJDzdc98URql3ie6f1jH8mGxpSmnw26tja1C6XOhw1W9zRMjlGoiNXNFG8UjZAduQEJryIZEOKqpzp08FeFSm6kE6x5FZc3oPsX7kk4vxCFc1iZU38NT8y6ttx250Q8vu22uXRYozeVuXF/uvrC97qx7YxAuaeDdehxCugDqNHqy3UVp8+vENe9TnC+h5llkw8j4NzTlQZt/S1TV7VXWz1r3V47Zj9e8T7EHM4iEi9iE5Q1fXos9atO9O91wCBV2mfAIe/wrF7FH3rUSMmFTU1uzYAm5I/DI5uQJPMJpdMLgVDgm4WwPOqG6BQhVFmf0dgmbEIMxQOjXmpiEG2VswgSiVKH8HdypiEOIraWcuXB0wrUyOmEzAUKRE/Veg45byf+GwX9CcLMpDiFyxreM1xN14+nt22efPjOePT17+/ZzbnkxuK8dJ+OPJUDIqbvpL85adpv8R3/8yLrRnVKgEo6hzi1cY3Ki/uL2Wb/9yEyp/LkQi3BCg16PJyVk1mlqZ89+Y5v788fgvHCe2SyMMXu6gDjH98WpX2z053e+Cdqdl/6ncPa048zxBxMhDKZ9/WUQMQAYTPZohIN4tTZ5nOovnnoZ7zx9Efg7G6NYtTa0emkwToOLSZTRhrzzzfMXwY3Qbd4+aJx6KVrNm/FijSkx1Z69fP70+ctnBlN9qnEvScCpeSttD5YR9syyJTbRzkyDSRRoPqyjrT2xFn2SwVMZJEINb/1QAVEEiLV+iLQGzEeMRCgCxFoDRlrHFyCG7xk2hIBY6/g4ezFEiKFVG31WfAUi0l4MnP00IivdDSG8K7s6D2c/Dc6eKJFV57IVycpMJTsnuRIYaU8Uzr42kZXXK9msANFIZ7OVddllskj72lD2JgptgxASN/LM+ovsenWsvYko+0vFTqQcFqPhc1+687j0cnXl/aUtvD3CQitlHavYZDap+6jsSmesPcIo+7zFhHezXatQykrF84hMStH2eaPs1Rda1UvI2t0ko9Tdq49xvYWYcE5KKEsWeNdboFwz8zUSutfMKHbEr5dwGvfata+P0D4cQ1O+kvvrVZrixQSuIWWtFEKYYLbwXEOaUlq8iJrx+ZYgoec6YMVrueVHDFWkgBXZS9UIfddyn1e6Hl86t3gSQriW2Nyic4Cic6ZCUoQhUioXUyVC56yoDqFKmMp9GAKYzSZFGDgXQ+lsEwGhdZ+udXmQ0ilwjrmhFw6h/2wTlaTPEFot/unVz69/+TWzGUq4mfn1l9c/v/qph+VUIWTOp1E4Y8hHmMvN/kTQjob7+xuNRubc/dAovX8uQ57Z399/9MvrV/TmcziEzBlDCudEdc9UqG68ev1rxkLrWDTCjhHORoZilqvqu6Dd+wggnPVFCcvV0sb84f3f+l02AGEHs/Hb7+31WbqRVoGQc9YXvKiYP1PqeULPDtK3hjMZVUIKuUOPOJlbK5fghJzz2sAlNzP/x6G9Yqb/2Y9CmDmy3k032n/koY1aTrGEoHmwad57YPQ6m9CPmLaei6ClLOG5Sud6KT391z3QLXq55yYCyjWm9qbS2+tWCStsW4cjEDKhTTzvrHYYvb3v38Vn5J99GTthmM2HHjzyjXPibXgrlHCLCW3yKs96jtGbfjgdk9F7HDT4DFqz+cDHRwhZocn0/xlKyHbeTP+Ob8WKMsbyo+80aC9hjJuvmBrxX6BIr+80mLY2tkMJt9lX2VLjYzTexED0HQYNOwvavJcO8qUNnW0pQQwBzGZZF5IwrQTXcozeyr3IjMKzoKP3xAe9nH0WWbYbhospT0q9UuNl/CsiouQ872hH75mLFcaBlJDb1rCOyOuGAalxrfd9JMUJ3MUj/rn65j2OA9PcfG9ZCCGnF9Lvhbs4bqSjRKr0XP0I90YQAaZ1nmSEhWmFo7/UglLjRmo4oucIYR5haF1RCJhO84I0TE25Skq/F8FnEMRQQvn9LUKnGE3RorzByfd2YyVJv7IlehFHajqBGgIYdo+SsLPbzO94ImMFqSDeSKeS+FD0Gr7UUAtTVOZulgyhPO3fEwEKhYYQvhU5URSjQqmxEKU7K9ibrsa735P5nXCPk34kam1meIePWNkRuTDTEEgNJXwga+AFhodzzy5ZFBhCwoqwtQTxbZZlrGS3ZS/hb99Ih/REk8XhEEpu0CkJUpHQ2EGX2az4GSuVzYzQ6RkqNcLvUiKnvFt1xrp3nvlQTCgUmk6Lt7cIVWeHCfm5tS37RmRSk+59KGzfEocm1v0PZd2QM7HwWWO4f2drkxY17m9u7fQPhzxdIjXGd0JCLgzvQZGemsJsn9blLuxADp+jNhyGR00sNYYhIIxxD8vUMj/vL4qDlDuxULHfRB9FwpRf241zH1LRbr53YkLuxELFZFLzjhtgN/goce4HbP4lJvxdlO+hFltqYt4PmJsyZELzNkLXimVxpYbfCSWEvPtym8KtsOk0NiCZk4gJKyxhITjgDifkZMVVYZAa6EJDwlT4baZ7mekB9y6yYYTsapRkRMMp66panFGNycwoIhHWA0403wAmFnAb3hRLTbC0yLmFbBTC1Li/K5oPxITiiQXYZBOowByxOCChkBEGBFUipYIKhpLJpMYvpkIZDSdMDXoRTeHUSVjBUDJRrYZOoLyEhZaUQU7oQ2yCJxZAwqxYajxiKs4TkQhTK11ESAVDxWRS0xXTwkoIQRhhatRBlEkpuzSKYDKpeWdGBQwndBElo1LO0iiCNd6Gj0zDASMQOohiKZVXMODWLwJ0xTSsD0Yk7MiNyax4uYSJCI1Majoj0xAVjU6YalHEaXE3DKtgAG14U3zRW2TAaIRWWUMywU+ETy41ZNBcZIq/CoSpAdMUTvCTmFhYJhnV0DUo2VAtPmGq3hQmC/wKhmNiqel905QMtkGEqfrfotsAJSU0VGpETqz9HbXd0QlTqX8EiEkJDV1dFRDW/ove7BiEqX9rPG0z9KQAhYvdtX9jtDoOYar+nuNG/FKpa40dHmHtfdQuGJ+QRip7vFNiQkOcyE7YjNo/8ZockzD1L1Nvwy+Vdo2VGiMdJ0IhhDRS/Yz4pVIPYUBqjJgRCiIMutEwEuMjUfq7fwtfbAfCCFN1b29MUGgCE6jYPRBOSNxYcUU1SaEh1pWaWgXgQDBhKvWf48YkhcYjNUacJI9C6CpOciMai9CWGhKgsRVGmTCVOm8x6km6MDNMpQaioCiEpDsSxiSFxhrVED5YB8QgpIzJCk1mWJFPmTCV+nw8tZAY38LJsSIfAiFh/HAylYTaNKZOPnxWbx4CIbHdoxNsRy6cHO0q6EvXcAhTqY97U4jRujA1tfcRqWVYhMR2j09QIBtTU8c47rMMkZCMAnaPVT25QPEE+0ZghkpIrP5xLwN1JZGWhT1E79mGTUjt8+5xhvgyjr42iO8yx58QpJOxJAipfd7dOzohmKGcDQp3sr23mwQdtaQIqdU/7346PiIAlHSh0fBzLdA/nCwcHX9IDM6yJAk7Vv/8cffThw97x9tHR9ZS6tHR9vHx3odPux8/1rF7HWv/B3ATq7iHJckOAAAAAElFTkSuQmCC"
                      alt="Maxwell Admin"
                    />
                  </div>
                  <h5 className="user-name">Asma Wannes</h5>
                  <h6 className="user-email">
                    <a
                      href="/cdn-cgi/l/email-protection"
                      className="__cf_email__"
                      data-cfemail="9de4e8f6f4ddd0fce5eaf8f1f1b3fef2f0"
                    >
                      [email&#160;protected]
                    </a>
                  </h6>
                </div>
                <div className="about">
                  <h5>About</h5>
                  <p>
                    I'm Asma.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
          <div className="cardProfile h-100">
            <div className="card-body">
              <br></br>
              <div className="row gutters">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <h6 className="mb-2 text-success personal-details" >Personal Details</h6>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <div className="form-group">
                    <label htmlFor="fullName">Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="fullName"
                      placeholder="Enter full name"
                    />
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <div className="form-group">
                    <label htmlFor="eMail">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="eMail"
                      placeholder="Enter email ID"
                    />
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="text"
                      className="form-control"
                      id="phone"
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <div className="form-group">
                    <label htmlFor="website">Website URL</label>
                    <input
                      type="url"
                      className="form-control"
                      id="website"
                      placeholder="Website url"
                    />
                  </div>
                </div>
              </div>
              <br></br>
              <div className="row gutters">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <h6 className="mt-3 mb-2 text-success personal-details">Address</h6>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                <div className="form-group">
                <label htmlFor="Street">Street</label>
                <input
                                  type="name"
                                  className="form-control"
                                  id="Street"
                                  placeholder="Enter Street"
                                />
                </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                <div className="form-group">
                <label htmlFor="ciTy">City</label>
                <input
                                  type="name"
                                  className="form-control"
                                  id="ciTy"
                                  placeholder="Enter City"
                                />
                </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                <div className="form-group">
                <label htmlFor="sTate">State</label>
                <input
                                  type="name"
                                  className="form-control"
                                  id="sTate"
                                  placeholder="Enter State"
                                />
                </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                <div className="form-group">
                <label htmlFor="zIp">ZIP</label>
                <input
                                  type="text"
                                  className="form-control"
                                  id="zIp"
                                  placeholder="Enter ZIP Code"
                                />
                </div>
                </div>
                
      
                <br></br>
                <br></br>
              </div>
                <div className="row gutters">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="text-right">
                  <div className='buttonProfile'>
                <button
                                  type="button"
                                  id="submit"
                                  name="submit"
                                  className="btn right-btn btn-outline-danger"
                                >
                Cancel
                </button>
                <button
                                  type="button"
                                  id="submit"
                                  name="submit"
                                  className="btn left-btn btn-outline-success" 
                                >
                Update
                </button>
                </div>
                </div>
                </div>
                </div>
              </div>
             </div>
           </div>
          </div>
      
    </div>
    </div>
    
    
  );
}

export default MonFormulaire;
