import bgVideo from '../assets/Background - Made with Clipchamp.mp4';
import profilePhoto from '../assets/WhatsApp Image 2025-11-13 at 07.42.34_39eb446b.jpg';
function Profile() {
  return (
    <div className="profile-page">
      <video
        className="bg-video"
        src={bgVideo}
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="bg-overlay" />

      <div className="profile-container">
        <header className="profile-header">
          <img src={profilePhoto} alt="Profile Photo" className="profile-photo" />
          <h1>Benedik Uning</h1>
          <p className="subtitle">High School Student | Grade 11</p>
        </header>

        <section className="info-card">
          <h2>Personal Information</h2>
          <div className="info-grid">
            <p><strong>Student ID:</strong> 24.07.5.10.0004</p>
            <p><strong>Date of Birth:</strong> 2009-09-24</p>
            <p><strong>Place of Birth:</strong> Balikpapan</p>
            <p><strong>Address:</strong> Citraland, The Orchard Block 6, no.20</p>
            <p><strong>Hobbies:</strong> Watching movies and TV shows</p>
          </div>
        </section>

        <section className="info-card">
          <h2>Education</h2>
          <div className="info-grid">
            <p><strong>School:</strong> Sekolah Citra Kasih</p>
            <p><strong>Grade:</strong> Grade 11</p>
            <p><strong>Extracurricular:</strong> Taekwondo</p>
          </div>
        </section>

        <section className="info-card">
          <h2>Skills</h2>
          <ul className="skills-list">
            <li>HTML & CSS</li>
            <li>Basic JavaScript</li>
            <li>Scratch and Makeblock</li>
          </ul>
        </section>

        <section className="info-card">
          <h2>Contact</h2>
          <p><strong>Email:</strong> benedik.uning@student.citrakasih.sch.id</p>
          <p><strong>Instagram:</strong> @Something123</p>
        </section>
      </div>

  <style jsx>{`
        
        .profile-page {
          position: relative;
          min-height: 100vh;
          overflow: hidden;
        }

        
        .bg-video {
          position: fixed;
          inset: 0; /* top:0; right:0; bottom:0; left:0; */
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 0;
        }

        
        .bg-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.35);
          z-index: 1;
        }

        
        .profile-container {
          position: relative;
          z-index: 2;
          max-width: 800px;
          margin: 0 auto;
          padding: 30px;
          background: rgba(28, 77, 224, 0.55);
          min-height: 100vh;
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
      .profile-header {
          text-align: center;
          background: linear-gradient(180deg, #062aceff 0%, #4d0e8dff 100%);
          color: white;
          padding: 25px;
          border-radius: 16px;
          box-shadow: 0 4px 12px rgba(237, 232, 232, 0.39);
        }

        .profile-photo {
          width: 200px;
          height: 200px;
          border-radius: 70%;
          border: 5px solid white;
          object-fit: cover;
          margin-bottom: 15px;
        }

        .profile-header h1 {
          margin: 10px 0;
          font-size: 28px;
          font-weight: 600;
        }

        .subtitle {
          font-size: 16px;
          opacity: 0.9;
          font-weight: 300;
        }

    .info-card {
          background: linear-gradient(135deg, #0d32dbff 0%, #6317afff 100%);
          color: white;
          padding: 20px;
          border-radius: 12px;
          border-left: 4px solid #667eea;
          box-shadow: 0 2px 8px rgba(225, 213, 213, 0.49);
        }

        .info-card h2 {
          color: #eee7e7ff;
          font-size: 20px;
          margin-bottom: 12px;
          border-bottom: 2px solid #e0e6ff;
          padding-bottom: 6px;
        }

        .info-grid p { margin: 8px 0; font-size: 15px; color: #eadedeff; }
        .info-grid strong { color: #eee2e2ff; min-width: 120px; display: inline-block; }

        .skills-list { list-style: none; padding: 0; }
        .skills-list li {
          background-color: #072f6fff;
          color: #d9d8ddff;
          padding: 8px 12px;
          margin: 6px 0;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          border-left: 3px solid #d8d5daff;
        }
   `}</style>
    </div>
  );
}

export default Profile