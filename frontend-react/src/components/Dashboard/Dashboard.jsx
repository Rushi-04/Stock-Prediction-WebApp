import axiosInstance from '../../axiosInstance'
import React, { useEffect, useState } from 'react'

const Dashboard = () => {
  const [ticker, setTicker] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [plot, setPlot] = useState(null);
  const [ma_100, setMA_100] = useState(null);
  const [ma_200, setMA_200] = useState(null);
  const [finalPlot, setFinalPlot] = useState(null);
  const [mse, setMSE] = useState(null);
  const [rmse, setRMSE] = useState(null);
  const [r2, setR2] = useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedTicker = ticker.trim().toUpperCase();

    if (!trimmedTicker) {
      setError("Please enter a valid stock ticker.");
      return;
    }

    setLoading(true);
    setError('');
    setPlot(null);

    try {
      const response = await axiosInstance.post('/predict/', {
        ticker: trimmedTicker
      });

      console.log(response.data);

      if (response.data.error) {
        setError(response.data.error);
        setPlot(null);
      } else {
        const backendRoot = import.meta.env.VITE_BACKEND_ROOT;
        const plotUrl = `${backendRoot}${response.data.plot_img}`;
        const ma_100_Url = `${backendRoot}${response.data.plot_100_dma}`;
        const ma_200_Url = `${backendRoot}${response.data.plot_200_dma}`;
        const final_plot_Url = `${backendRoot}${response.data.final_prediction}`;
        setPlot(plotUrl);
        setMA_100(ma_100_Url)
        setMA_200(ma_200_Url)
        setFinalPlot(final_plot_Url)
        setMSE(response.data.mse)
        setRMSE(response.data.rmse)
        setR2(response.data.r2)
        setError('');
        console.log('200 DMA url', ma_200_Url);
        console.log('200 DMA', ma_200);
      }
    } catch (error) {
      console.error("There was an error making the API request", error);
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const fetchProtectedData = async () => {
      try {
        const response = await axiosInstance.get('/protected-view');
        console.log("Success", response.data);
      } catch (error) {
        console.error("Error occurred", error);
      }
    };
    fetchProtectedData();
  }, []);

  //<div className="h-[40rem] w-full bg-gray-950 relative flex flex-col items-center justify-center antialiased overflow-hidden">
  // {/* Background effect */}
  // <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-gray-900 to-black opacity-40 animate-pulse"></div>

  // <div className="max-w-2xl mx-auto p-4 z-10"></div>  from-green-500  to-blue-600   from-blue-600 to-green-500

  return (
    <div className="min-h-screen w-full bg-gray-950 relative flex flex-col items-center justify-center antialiased overflow-hidden px-4">
      {/* Background effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-green-500 opacity-40 animate-pulse"></div>

      <div className="max-w-2xl mx-auto p-6 z-10">
        <h1 className="text-4xl md:text-6xl text-white text-center font-bold">
          Predict Your Next Stock Here
        </h1>
        <p className="text-gray-300 max-w-lg mx-auto my-4 text-sm text-center">
          Enter a valid stock ticker (e.g., <code className="text-white font-mono">AAPL</code>, <code className="text-white font-mono">TSLA</code>, <code className="text-white font-mono">MSFT</code>) to generate AI-based predictions and insights.
        </p>
        <form onSubmit={handleSubmit} className=''>
          <input
            type="text"
            placeholder="Enter Stock Ticker (e.g., AAPL)"
            className="w-full px-4 py-3 mt-15 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase tracking-wide font-medium"
            onChange={(e) => setTicker(e.target.value)}
          />
          <small>{error && <div className='text-red-500 text-center font-semibold text-lg m-2 ' >{error}</div>}</small>
          {/* <button type="submit" className='bg-white  text-black text-md font-medium p-2 m-3 rounded-xl cursor-pointer text-center flex justify-center items-center hover:ring-2 hover: ring-red-500 '>See Prediction</button> */}
          <div className='flex justify-center '>
            {loading ?
              (<button
                type="button"
                disabled
                className=" flex w-35 justify-center items-center gap-2 p-2 m-3 bg-gray-200 text-gray-600 rounded-xl font-semibold cursor-not-allowed transition-all"
              >
                <svg
                  className="w-5 h-5 animate-spin text-teal-700"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 11-8 8z"
                  />
                </svg>
                Loading ...
              </button>)
              :
              (<button
                type="submit"
                className='bg-white w-35 text-black text-md font-medium p-2 m-3 rounded-xl cursor-pointer text-center flex justify-center items-center hover:ring-2 hover: ring-red-500  '
              >
                See Prediction
              </button>)
            }
          </div>
        </form>
      </div>
      {/* Basic Plot */}
      {plot && (
        <div className="z-10 m-10 w-full max-w-7xl px-4">
          <p className='text-white text-2xl m-2 font-semibold  '>Basic Plot</p>
          <img src={plot} alt="Prediction Plot" className="w-full rounded-xl shadow-lg" />
        </div>
      )}
      {/* 100 DMA Plot */}
      {ma_100 && (
        <div className="z-10 m-10 w-full max-w-7xl px-4">
          <p className='text-white text-2xl m-2 font-semibold  '>100 Days Moving Average</p>
          <img src={ma_100} alt="Prediction Plot" className="w-full rounded-xl shadow-lg" />
        </div>
      )}
      {/* 200 DMA Plot */}
      {ma_200 && (
        <div className="z-10 m-10 w-full max-w-7xl px-4">
          <p className='text-white text-2xl m-2 font-semibold  '>200 Days Moving Average</p>
          <img src={ma_200} alt="Prediction Plot" className="w-full rounded-xl shadow-lg" />
        </div>
      )}
      {/* Final Prediction Plot */}
      {finalPlot && (
        <div className="z-10 m-10 w-full max-w-7xl px-4">
          <p className='text-white text-2xl m-2 font-semibold  '>Final Prediction</p>
          <img src={finalPlot} alt="Prediction Plot" className="w-full rounded-xl shadow-lg" />
        </div>
      )}
      {finalPlot && (
        <div className="max-w-xl w-full bg-gray-900 bg-opacity-60 border border-gray-700 rounded-2xl shadow-xl p-6 mb-5 text-white backdrop-blur-md">
          <h4 className="text-3xl font-semibold text-center mb-4 text-blue-400">Model Evaluation</h4>
          <ul className="space-y-3 text-lg md:text-xl">
            <li>
              <span className="text-gray-400">1. Mean Squared Error (MSE): </span>
              <span className="font-semibold text-white">{mse}</span>
            </li>
            <li>
              <span className="text-gray-400">2. Root Mean Squared Error (RMSE): </span>
              <span className="font-semibold text-white">{rmse}</span>
            </li>
            <li>
              <span className="text-gray-400">3. R-Squared (R²): </span>
              <span className="font-semibold text-white">{r2}</span>
            </li>
          </ul>
        </div>
      )}

    </div>
  );
};

export default Dashboard;
