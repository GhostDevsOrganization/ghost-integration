import { useState } from 'react';

export default function NewsletterCommunity() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [showcase] = useState([
    {
      name: 'Kaspa Explorer',
      description: 'A real-time block explorer for the Kaspa network.',
      url: 'https://kaspascan.io',
    },
    {
      name: 'Kaspa Discord',
      description: 'Join the vibrant Kaspa community on Discord.',
      url: 'https://discord.gg/kaspa',
    },
    {
      name: 'Kaspa Wallet',
      description: 'Official wallet for storing and managing KAS.',
      url: 'https://kaspa.org/wallet',
    },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) {
      setError('Please enter a valid email address.');
      return;
    }
    setSubmitted(true);
    // Here you would send the email to your backend/newsletter service
  };

  return (
    <section className="py-20 bg-black/90 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 w-2/3 h-1/3 bg-green-400/10 rounded-full blur-3xl -translate-x-1/2"></div>
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-green-400/10 rounded-full blur-3xl"></div>
      </div>
      <div className="mx-auto max-w-4xl px-4 relative z-10">
        <h2 className="mb-8 text-center text-4xl font-bold">
          Join the <span className="text-green-400">Kaspa</span> Community
        </h2>
        <div className="flex flex-col md:flex-row gap-12">
          {/* Newsletter Signup */}
          <div className="flex-1 bg-black/60 rounded-lg p-8 shadow-lg border border-green-400/10">
            <h3 className="text-2xl font-bold mb-4 text-green-400">Newsletter Signup</h3>
            <p className="mb-4 opacity-80">Get the latest updates, news, and exclusive offers from the Kaspa ecosystem.</p>
            {submitted ? (
              <div className="text-green-300 font-semibold">Thank you for subscribing!</div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                  type="email"
                  className="rounded-md px-4 py-2 bg-black/80 border border-green-400/30 text-white focus:outline-none focus:border-green-400 transition"
                  placeholder="Enter your email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
                {error && <div className="text-red-400 text-sm">{error}</div>}
                <button
                  type="submit"
                  className="rounded-md bg-gradient-to-r from-green-500 to-green-600 px-4 py-2 font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-400/20"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
          {/* Community Showcase */}
          <div className="flex-1 bg-black/60 rounded-lg p-8 shadow-lg border border-green-400/10">
            <h3 className="text-2xl font-bold mb-4 text-green-400">Community Projects</h3>
            <ul className="space-y-6">
              {showcase.map((item, idx) => (
                <li key={idx} className="bg-green-400/5 rounded-md p-4 hover:bg-green-400/10 transition">
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-lg font-semibold text-green-300 hover:underline">
                    {item.name}
                  </a>
                  <p className="text-white opacity-80 text-sm mt-1">{item.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
