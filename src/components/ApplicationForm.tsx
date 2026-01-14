import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Send, CheckCircle } from 'lucide-react';

interface ApplicationFormProps {
  onClose: () => void;
}

export function ApplicationForm({ onClose }: ApplicationFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    experience: '',
    cryptoKnowledge: 'basic',
    motivation: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    // Auto close after success
    setTimeout(() => {
      onClose();
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100] flex items-center justify-center p-8 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{
          duration: 0.5,
          ease: [0.16, 1, 0.3, 1] // Sharp cubic-bezier
        }}
        className="bg-[#1E2329] border border-[#2B3139] rounded-2xl p-8 max-w-2xl w-full shadow-[0_0_50px_rgba(0,0,0,0.5)] relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
        >
          <X className="w-6 h-6 text-gray-400 hover:text-white" />
        </button>

        {!submitted ? (
          <>
            {/* Header */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center mb-8"
            >
              <h2 className="text-4xl mb-2 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                Secure Your Position
              </h2>
              <p className="text-gray-400">Join the Elite Binance Futures CS Team</p>
            </motion.div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <label className="block text-sm mb-2 text-gray-300">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-800/50 border border-blue-500/30 rounded-lg focus:outline-none focus:border-green-500 transition-colors text-white"
                  placeholder="John Doe"
                />
              </motion.div>

              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="grid md:grid-cols-2 gap-6"
              >
                <div>
                  <label className="block text-sm mb-2 text-gray-300">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-800/50 border border-blue-500/30 rounded-lg focus:outline-none focus:border-green-500 transition-colors text-white"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2 text-gray-300">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-800/50 border border-blue-500/30 rounded-lg focus:outline-none focus:border-green-500 transition-colors text-white"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <label className="block text-sm mb-2 text-gray-300">Years of CS Experience *</label>
                <input
                  type="number"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  required
                  min="0"
                  className="w-full px-4 py-3 bg-slate-800/50 border border-blue-500/30 rounded-lg focus:outline-none focus:border-green-500 transition-colors text-white"
                  placeholder="5"
                />
              </motion.div>

              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.45 }}
              >
                <label className="block text-sm mb-2 text-gray-300">Cryptocurrency Knowledge Level *</label>
                <select
                  name="cryptoKnowledge"
                  value={formData.cryptoKnowledge}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-800/50 border border-blue-500/30 rounded-lg focus:outline-none focus:border-green-500 transition-colors text-white"
                >
                  <option value="basic">Basic - I know the fundamentals</option>
                  <option value="intermediate">Intermediate - I trade occasionally</option>
                  <option value="advanced">Advanced - I'm an active trader</option>
                  <option value="expert">Expert - I understand derivatives</option>
                </select>
              </motion.div>

              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <label className="block text-sm mb-2 text-gray-300">Why do you want to join Binance Futures? *</label>
                <textarea
                  name="motivation"
                  value={formData.motivation}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-blue-500/30 rounded-lg focus:outline-none focus:border-green-500 transition-colors text-white resize-none"
                  placeholder="Share your motivation and what excites you about this role..."
                />
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <button
                  type="submit"
                  className="w-full px-6 py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 rounded-xl text-lg flex items-center justify-center gap-3 shadow-lg shadow-green-500/50 transition-all"
                >
                  <Send className="w-5 h-5" />
                  Submit Application
                </button>
              </motion.div>
            </form>
          </>
        ) : (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', duration: 0.6 }}
            className="text-center py-12"
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 360]
              }}
              transition={{ duration: 0.6 }}
            >
              <CheckCircle className="w-24 h-24 text-green-400 mx-auto mb-6" />
            </motion.div>
            <h3 className="text-4xl mb-4 text-green-400">Application Submitted!</h3>
            <p className="text-xl text-gray-300 mb-2">
              Welcome to the future of futures trading.
            </p>
            <p className="text-gray-400">
              Our recruitment team will contact you within 48 hours.
            </p>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 3 }}
              className="h-1 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mt-8"
            />
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}