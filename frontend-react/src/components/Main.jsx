import React from 'react'
import { motion } from 'framer-motion'
import { Brain, TrendingUp, Shield, Users, Sparkles } from 'lucide-react'
import Button from './Button'

const scrollVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: 'easeOut' },
  }),
}

const Main = () => {
  return (
    <div className="relative bg-white overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center space-y-10">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-medium"
          >
            <Sparkles className="h-4 w-4 mr-2" /> Powered by AI
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl font-bold text-gray-900"
          >
            Predict Stocks With
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
              {' '}AI Precision
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg text-gray-900 max-w-3xl mx-auto"
          >
            Leverage deep learning to forecast stock trends. Our AI model uses historical data of stocks and analyzes it using neural networks to deliver daily predictions and insights — ideal for new and curious investors.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Button
              text="Get Started"
              styler="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium"
            />
            <Button
              text="Go to Dashboard"
              styler="border border-gray-300  hover:bg-gray-100 px-8 py-3 rounded-full font-medium"
              url='/dashboard'
            />
          </motion.div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
          {[{
            title: 'AI - Forecasting',
            desc: 'Uses neural networks to identify trends and make next-day stock predictions.',
            icon: <Brain className="h-6 w-6 text-blue-600" />, bg: 'bg-blue-100'
          }, {
            title: 'Clean, Beginner UI',
            desc: 'Built with a focus on simplicity. No finance background required — just insights you can understand.',
            icon: <Shield className="h-6 w-6 text-green-600" />, bg: 'bg-green-100'
          }, {
            title: 'Real Market Data',
            desc: 'Uses real time data to ensure accurate and up-to-date stock price data for predictions.',
            icon: <TrendingUp className="h-6 w-6 text-purple-600" />, bg: 'bg-purple-100'
          }].map((feature, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={scrollVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white shadow-md rounded-lg p-6 text-center"
            >
              <div className={`w-12 h-12 ${feature.bg} rounded-full flex items-center justify-center mx-auto mb-4`}>
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-20 text-center space-y-3"
        >
          <p className="text-md text-gray-600">Helping new investors unlock market potential</p>
          <div className="flex justify-center items-center gap-2">
            <Users className="h-5 w-5 text-gray-400" />
            <span className="text-2xl font-bold text-gray-900">1,100+</span>
            <span className="text-gray-600">users predicted stocks with our model</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Main;
