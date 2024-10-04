import Head from 'next/head';
import { useState } from 'react';

export default function Home() {
  const [ndsFile, setNdsFile] = useState(null);
  const [savFile, setSavFile] = useState(null);

  const handleNdsFileChange = (e) => setNdsFile(e.target.files[0]);
  const handleSavFileChange = (e) => setSavFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('ndsFile', ndsFile);
    if (savFile) formData.append('savFile', savFile);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();
    console.log(result);
  };

  return (
    <div className="container">
      <Head>
        <title>KurumaDS</title>
        <meta name="description" content="DS Emulator" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="logo">
          <img src="/dp.png" alt="KurumaDS Logo" />
          <h1>KurumaDS</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <input type="file" accept=".nds" onChange={handleNdsFileChange} required />
          <input type="file" accept=".sav" onChange={handleSavFileChange} />
          <button type="submit">Start game</button>
        </form>
      </main>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-color: #2E2D3D;
          color: #ffffff;
        }
        .logo {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        h1 {
          font-family: 'SF Pro Rounded', sans-serif;
          font-size: 3rem;
          color: #EA6F11;
        }
        form {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        input {
          margin: 1rem;
          padding: 0.5rem;
          border-radius: 5px;
          border: none;
        }
        button {
          padding: 0.5rem 1rem;
          border-radius: 5px;
          border: none;
          background-color: #EA6F11;
          color: #ffffff;
          font-family: 'SF Pro Rounded', sans-serif;
        }
      `}</style>
    </div>
  );
}
