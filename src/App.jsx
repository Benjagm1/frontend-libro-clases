import { useState } from 'react';
import './App.css';
import { authService } from './services/authService';

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  
  const initialState = {
    nombre: '', apellido: '', email: '', contrasena: '', tipo: 'ESTUDIANTE'
  };
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleView = (toLogin) => {
    setIsLogin(toLogin);
    setFormData(initialState);
    setError('');
    setMsg('');
    setAcceptedTerms(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMsg('');
    
    if (!isLogin && !acceptedTerms) {
      setError("Debes aceptar los términos y condiciones institucionales.");
      return;
    }

    try {
      if (isLogin) {
        const data = await authService.login(formData.email, formData.contrasena);
        setMsg(`¡Acceso exitoso! Rol: ${data.tipo}`);
        console.log('User Data:', data);
      } else {
        const res = await authService.registrar(formData);
        setMsg("Cuenta creada exitosamente. Por favor, ingresa.");
        setIsLogin(true);
        setFormData(initialState);
        setAcceptedTerms(false);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="app-wrapper">
      {/* NAVBAR SUPERIOR */}
      <nav className="navbar">
        <div className="nav-brand">Colegio Bernardo O'Higgins</div>
        <div className="nav-links">
          <span>Portal Académico</span>
          <span>Reglamento</span>
          <span>Comunidad</span>
          <span>Soporte CIE</span>
        </div>
        <div className="nav-actions">
          <button className="nav-btn-text" onClick={() => toggleView(true)}>Ingresa</button>
          <button className="nav-btn-solid" onClick={() => toggleView(false)}>Regístrate</button>
        </div>
      </nav>

      {/* CONTENIDO PRINCIPAL */}
      <main className="main-content">
        
        {/* LADO IZQUIERDO: Gráficos y texto */}
        <section className="hero-section">
          <div className="hero-graphic">BO</div>
          
          <h1 className="hero-title">Libro de Clases Digital</h1>
          <div className="hero-badge">Colegio Bernardo O'Higgins</div>
          <p style={{marginTop: '10px', color: '#cbd5e1', maxWidth: '400px', lineHeight: '1.6'}}>
            Plataforma oficial para la gestión académica, control de asistencia y comunicación institucional.
          </p>
        </section>

        {/* LADO DERECHO: Tarjeta de Formulario */}
        <section className="form-section">
          <div className="auth-card">
            
            {!isLogin && (
              <button className="back-btn" onClick={() => toggleView(true)} title="Volver al Login">
                ←
              </button>
            )}

            <h2>{isLogin ? 'Ingresa a tu cuenta' : 'Crea tu cuenta institucional'}</h2>

            {error && <p style={{color: '#dc2626', fontSize: '0.85rem', marginBottom: '15px'}}>{error}</p>}
            {msg && <p style={{color: '#16a34a', fontSize: '0.85rem', marginBottom: '15px'}}>{msg}</p>}

            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <>
                  <div className="form-group">
                    <label>Nombre completo</label>
                    <input name="nombre" value={formData.nombre} onChange={handleChange} required placeholder="Ej: Juan" />
                  </div>
                  <div className="form-group">
                    <label>Apellidos</label>
                    <input name="apellido" value={formData.apellido} onChange={handleChange} required placeholder="Ej: Pérez" />
                  </div>
                  <div className="form-group">
                    <label>Rol en la institución</label>
                    <select name="tipo" value={formData.tipo} onChange={handleChange}>
                      <option value="ESTUDIANTE">Estudiante</option>
                      <option value="PROFESOR">Profesor</option>
                      <option value="APODERADO">Apoderado</option>
                    </select>
                  </div>
                </>
              )}
              
              <div className="form-group">
                <label>Correo electrónico</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
              </div>
              
              <div className="form-group">
                <label>Contraseña</label>
                <input type="password" name="contrasena" value={formData.contrasena} onChange={handleChange} required />
              </div>

              {!isLogin && (
                <div className="checkbox-group">
                  <input 
                    type="checkbox" 
                    id="terms" 
                    checked={acceptedTerms} 
                    onChange={(e) => setAcceptedTerms(e.target.checked)} 
                  />
                  <label htmlFor="terms" className="checkbox-text">
                    Para crear la cuenta debes aceptar las <a href="#">Políticas de Privacidad</a> y el <a href="#">Reglamento Institucional</a>
                  </label>
                </div>
              )}

              <button 
                type="submit" 
                className="btn-submit"
                disabled={!isLogin && !acceptedTerms}
              >
                {isLogin ? 'Iniciar sesión' : 'Crear cuenta'}
              </button>
            </form>

          </div>
        </section>
      </main>
    </div>
  );
}

export default App;