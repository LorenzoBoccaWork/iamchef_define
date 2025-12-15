import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found">
      <h1>404 - Pagina non trovata</h1>
      <p>La ricetta che stai cercando non esiste. Torna alla ricerca!</p>
      <a href="/" className="back-link">Torna alla home</a>
    </div>
  );
};

export default NotFound;