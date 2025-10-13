import React from 'react';
const WalletIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
  </svg>
);

const CircleStackIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 15.353 16.556 17.25 12 17.25s-8.25-1.897-8.25-4.125V10.125" />
  </svg>
);

const CreditCardIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 21z" />
  </svg>
);
const FeatureCard = ({ icon, title, description, children }) => (
  <div className="bg-white/50 ring-1 ring-slate-200/50 backdrop-blur-sm rounded-2xl p-8 flex flex-col items-start h-full transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
    <div className="bg-violet-100 text-violet-600 p-3 rounded-xl mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-slate-800 mb-3">{title}</h3>
    <p className="text-slate-500 mb-8 leading-relaxed flex-grow">{description}</p>
    <div className="w-full mt-auto">
      {children}
    </div>
  </div>
);

export default function Features() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <div className="container mx-auto px-4 py-20 lg:py-24">

        
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block bg-violet-100 text-violet-600 text-sm font-semibold py-1 px-4 rounded-full mb-4">
            Simple, Smart, Financial Control
          </span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-5">
            Powerful Features to Take Control of Your Finances
          </h1>
          <p className="text-lg text-slate-500">
            Manage your finances with ApexMoney. Monitor expenses, save efficiently all within a user-friendly app.
          </p>
        </div>

        
        <main className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          
          <FeatureCard
            icon={<WalletIcon className="w-6 h-6" />}
            title="Expense Tracking"
            description="Easily track your daily, weekly, and monthly expenses to stay in control of where your money goes."
          >
            <div className="flex gap-4">
              <img
                src="./App_Screen_One.png"
                alt="Expense Tracking App Screenshot 1"
                className="rounded-2xl shadow-lg w-1/2 object-cover"
              />
              <img
                src="./App_Screen_Two.png"
                alt="Expense Tracking App Screenshot 2"
                className="rounded-2xl shadow-lg w-1/2 object-cover"
              />
            </div>
          </FeatureCard>

          
          <FeatureCard
            icon={<CircleStackIcon className="w-6 h-6" />}
            title="Budget Planning"
            description="Set clear budgets, monitor your progress, and avoid overspending with smart, intuitive budgeting tools."
          >
            <div className="relative w-full h-56 flex justify-center">
               <img
                src="./App_Screen_One.png"
                alt="Budget Planning App Screenshot"
                className="absolute bottom-0 h-full w-auto rounded-2xl shadow-lg transform -rotate-12 translate-x-4"
              />
               <img
                src="./App_Screen_Two.png"
                alt="Budget Planning App Screenshot 2"
                className="absolute bottom-0 h-full w-auto rounded-2xl shadow-lg transform rotate-6 -translate-x-4"
              />
            </div>
          </FeatureCard>

          
          <FeatureCard
            icon={<CreditCardIcon className="w-6 h-6" />}
            title="Multi-Account Support"
            description="Manage all your bank accounts in one place. Track balances, move funds seamlessly between accounts."
          >
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-6 text-white shadow-lg w-full">
              <div className="flex justify-between items-center mb-8">
                <span className="text-lg font-semibold">Debit</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.252a10.25 10.25 0 018.683 15.111A10.25 10.25 0 113.317 17.363 10.25 10.25 0 0112 2.252z"/>
                  <path d="M12 4.252a8.25 8.25 0 016.949 12.089A8.25 8.25 0 115.051 16.341 8.25 8.25 0 0112 4.252z" opacity=".4"/>
                </svg>
              </div>
              <div className="text-2xl font-mono tracking-wider mb-2">
                1251 00•• •••• 0951
              </div>
              <div className="flex justify-between items-end">
                <span className="text-lg">Derek Houston</span>
                <span className="font-bold text-xl italic">VISA</span>
              </div>
            </div>
          </FeatureCard>

        </main>
        <div className="text-center mt-16">
          <button className="bg-violet-600 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 hover:bg-violet-700 hover:scale-105 shadow-lg shadow-violet-200">
            Explore All Features
          </button>
        </div>

      </div>
    </div>
  );
}