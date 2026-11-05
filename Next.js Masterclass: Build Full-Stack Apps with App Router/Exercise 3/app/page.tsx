// // import Image from "next/image";


// import { greet } from "./form/actions"


// const HomePage = () => {
//   return (
//     <div className=" flex flex col">
//     <form action={greet}>
//       <input type="text"  name="name"/>
//      <button type="submit"> submit </button>
//     </form>
//     </div>
//   )
// }

// export default HomePage

// "use client";

// import { useActionState } from "react";
// import { submitForm } from "./form/action";

// const initialState = {
//   error: "",
//   success: "",
// };

// export default function Home() {
//   const [state, formAction, isPending] = useActionState(
//     submitForm,
//     initialState
//   );


//   return (
//     <main className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 flex items-center justify-center p-6">
//       <div className="w-full max-w-lg bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">

//         <div className="text-center mb-8">
//           <span className="text-indigo-400 font-semibold tracking-widest text-sm">
//             NEXT.JS PRACTICE
//           </span>

//           <h1 className="text-3xl font-bold text-white mt-3">
//             Form Exercises
//           </h1>

//           <p className="text-slate-400 mt-2">
//             Complete all three exercises below.
//           </p>
//         </div>

//         <form action={formAction} className="space-y-6">

//           <div>
//             <h2 className="text-white font-semibold mb-3">
//               01. Basic Form
//             </h2>

//             <input
//               type="email"
//               name="email"
//               placeholder="Enter your email"
//               required
//               className="w-full bg-slate-900/70 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
//             />
//           </div>

//           <div>
//             <h2 className="text-white font-semibold mb-3">
//               02. Required Field
//             </h2>

//             <input
//               type="password"
//               name="password"
//               placeholder="Enter password (minimum 6 characters)"
//               required
//               className="w-full bg-slate-900/70 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
//             />
//           </div>

//           <div>
//             <h2 className="text-white font-semibold mb-3">
//               03. Full Name Greeting
//             </h2>

//             <div className="grid grid-cols-2 gap-3">
//               <input
//                 type="text"
//                 name="firstName"
//                 placeholder="First name"
//                 required
//                 className="w-full bg-slate-900/70 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none focus:border-indigo-500"
//               />

//               <input
//                 type="text"
//                 name="lastName"
//                 placeholder="Last name"
//                 required
//                 className="w-full bg-slate-900/70 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none focus:border-indigo-500"
//               />
//             </div>
//           </div>

//           {state?.error && (
//             <p className="text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-sm">
//               {state.error}
//             </p>
//           )}

//           {state?.success && (
//             <div className="text-green-300 bg-green-500/10 border border-green-500/20 rounded-xl p-4 text-center">
//               <p>{state.success}</p>
//             </div>
//           )}

//           <button
//             type="submit"
//             disabled={isPending}
//             className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg shadow-indigo-500/20"
//           >
//             {isPending ? "Submitting..." : "Submit Form →"}
//           </button>

//         </form>

//         <p className="text-center text-slate-500 text-xs mt-7">
//           Built with Next.js · Server Actions
//         </p>
//       </div>
//     </main>
//   );
// }

"use client";

import { useActionState } from "react";
import { submitForm } from "./form/action";

const initialState = {
  error: "",
  success: "",
};

export default function Home() {
  const [state, formAction, isPending] = useActionState(
    submitForm,
    initialState
  );

  return (
    <main className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-sm border border-gray-200">

        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Form Exercises
        </h1>

        <p className="text-gray-500 text-sm mb-6">
          Practice with Next.js forms and server actions.
        </p>

        <form action={formAction} className="space-y-5">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              className="w-full border border-gray-300 rounded-md p-2.5 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Minimum 6 characters"
              required
              className="w-full border border-gray-300 rounded-md p-2.5 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              placeholder="First name"
              required
              className="w-full border border-gray-300 rounded-md p-2.5 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              placeholder="Last name"
              required
              className="w-full border border-gray-300 rounded-md p-2.5 outline-none focus:border-blue-500"
            />
          </div>

          {state?.error && (
            <p className="text-sm text-red-600">{state.error}</p>
          )}

          {state?.success && (
            <p className="text-sm text-green-600">{state.success}</p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-md font-medium disabled:opacity-50"
          >
            {isPending ? "Submitting..." : "Submit"}
          </button>

        </form>
      </div>
    </main>
  );
}