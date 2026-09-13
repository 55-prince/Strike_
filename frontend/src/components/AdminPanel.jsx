// import { useForm, useFieldArray,Controller  } from 'react-hook-form';
// import { useState ,useEffect} from 'react';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import axiosClient from '../utils/axiosClient';
// import { useNavigate } from 'react-router';
// import Select from 'react-select';

// // Zod schema matching the problem schema
// const problemSchema = z.object({
//   title: z.string().min(1, 'Title is required'),
//   description: z.string().min(1, 'Description is required'),
//   difficulty: z.enum(['easy', 'medium', 'hard']),
//   tags: z.array(z.string()).min(1, 'At least one tag is required'),
//   visibleTestCases: z.array(
//     z.object({
//       input: z.string().min(1, 'Input is required'),
//       output: z.string().min(1, 'Output is required'),
//       explanation: z.string().min(1, 'Explanation is required')
//     })
//   ).min(1, 'At least one visible test case required'),
//   hiddenTestCases: z.array(
//     z.object({
//       input: z.string().min(1, 'Input is required'),
//       output: z.string().min(1, 'Output is required')
//     })
//   ).min(1, 'At least one hidden test case required'),
//   startCode: z.array(
//     z.object({
//       language: z.enum(['C++', 'Java', 'JavaScript']),
//       initialCode: z.string().min(1, 'Initial code is required')
//     })
//   ).length(3, 'All three languages required'),
//   referenceSolution: z.array(
//     z.object({
//       language: z.enum(['C++', 'Java', 'JavaScript']),
//       completeCode: z.string().min(1, 'Complete code is required')
//     })
//   ).length(3, 'All three languages required')
// });


// function AdminPanel() {
//   const navigate = useNavigate();

//   const [availableTags, setAvailableTags] = useState([]);
//   const [tagsLoading, setTagsLoading] = useState(true);

//   useEffect(() => {
//     axiosClient.get('/problem/tags')
//       .then((res) => setAvailableTags(res.data))
//       .catch((err) => console.error('Failed to load tags:', err))
//       .finally(() => setTagsLoading(false));
//     }, []);

    

//   const {register,control,handleSubmit,formState: { errors }} = useForm({
//     resolver: zodResolver(problemSchema),
//     defaultValues: {
//       startCode: [
//         { language: 'C++', initialCode: '' },
//         { language: 'Java', initialCode: '' },
//         { language: 'JavaScript', initialCode: '' }
//       ],
//       referenceSolution: [
//         { language: 'C++', completeCode: '' },
//         { language: 'Java', completeCode: '' },
//         { language: 'JavaScript', completeCode: '' }
//       ]
//     }
//   });

//   const {
//     fields: visibleFields,
//     append: appendVisible,
//     remove: removeVisible
//   } = useFieldArray({
//     control,
//     name: 'visibleTestCases'
//   });

//   const {
//     fields: hiddenFields,
//     append: appendHidden,
//     remove: removeHidden
//   } = useFieldArray({
//     control,
//     name: 'hiddenTestCases'
//   });

//   const onSubmit = async (data) => {
//     try {
//       await axiosClient.post('/problem/create', data);
//       alert('Problem created successfully!');
//       navigate('/');
//     } catch (error) {
//       alert(`Error: ${error.response?.data?.message || error.message}`);
//     }
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6">Create New Problem</h1>
      
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//         {/* Basic Information */}
//         <div className="card bg-base-100 shadow-lg p-6">
//           <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
//           <div className="space-y-4">
//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text">Title</span>
//               </label>
//               <input
//                 {...register('title')}
//                 className={`input input-bordered ${errors.title && 'input-error'}`}
//               />
//               {errors.title && (
//                 <span className="text-error">{errors.title.message}</span>
//               )}
//             </div>

//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text">Description</span>
//               </label>
//               <textarea
//                 {...register('description')}
//                 className={`textarea textarea-bordered h-32 ${errors.description && 'textarea-error'}`}
//               />
//               {errors.description && (
//                 <span className="text-error">{errors.description.message}</span>
//               )}
//             </div>

//             <div className="flex gap-4">
//               <div className="form-control w-1/2">
//                 <label className="label">
//                   <span className="label-text">Difficulty</span>
//                 </label>
//                 <select
//                   {...register('difficulty')}
//                   className={`select select-bordered ${errors.difficulty && 'select-error'}`}
//                 >
//                   <option value="easy">Easy</option>
//                   <option value="medium">Medium</option>
//                   <option value="hard">Hard</option>
//                 </select>
//               </div>

//               <div className="form-control w-1/2">
//                 <label className="label">
//                   <span className="label-text">Tags</span>
//                 </label>
//                 {tagsLoading ? (
//                   <span className="loading loading-spinner loading-sm"></span>
//                 ) : (
//                   <Controller
//                     name="tags"
//                     control={control}
//                     render={({ field: { value = [], onChange } }) => (
//                       <Select
//                         isMulti
//                         options={availableTags.map((tag) => ({ value: tag, label: tag }))}
//                         value={value.map((tag) => ({ value: tag, label: tag }))}
//                         onChange={(selected) => onChange(selected.map((s) => s.value))}
//                         classNamePrefix="react-select"
//                       />
//                     )}
//                   />
//                 )}
//                 {errors.tags && (
//                   <span className="text-error">{errors.tags.message}</span>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Test Cases */}
//         <div className="card bg-base-100 shadow-lg p-6">
//           <h2 className="text-xl font-semibold mb-4">Test Cases</h2>
          
//           {/* Visible Test Cases */}
//           <div className="space-y-4 mb-6">
//             <div className="flex justify-between items-center">
//               <h3 className="font-medium">Visible Test Cases</h3>
//               <button
//                 type="button"
//                 onClick={() => appendVisible({ input: '', output: '', explanation: '' })}
//                 className="btn btn-sm btn-primary"
//               >
//                 Add Visible Case
//               </button>
//             </div>
            
//             {visibleFields.map((field, index) => (
//               <div key={field.id} className="border p-4 rounded-lg space-y-2">
//                 <div className="flex justify-end">
//                   <button
//                     type="button"
//                     onClick={() => removeVisible(index)}
//                     className="btn btn-xs btn-error"
//                   >
//                     Remove
//                   </button>
//                 </div>
                
//                 <input
//                   {...register(`visibleTestCases.${index}.input`)}
//                   placeholder="Input"
//                   className="input input-bordered w-full"
//                 />
                
//                 <input
//                   {...register(`visibleTestCases.${index}.output`)}
//                   placeholder="Output"
//                   className="input input-bordered w-full"
//                 />
                
//                 <textarea
//                   {...register(`visibleTestCases.${index}.explanation`)}
//                   placeholder="Explanation"
//                   className="textarea textarea-bordered w-full"
//                 />
//               </div>
//             ))}
//           </div>

//           {/* Hidden Test Cases */}
//           <div className="space-y-4">
//             <div className="flex justify-between items-center">
//               <h3 className="font-medium">Hidden Test Cases</h3>
//               <button
//                 type="button"
//                 onClick={() => appendHidden({ input: '', output: '' })}
//                 className="btn btn-sm btn-primary"
//               >
//                 Add Hidden Case
//               </button>
//             </div>
            
//             {hiddenFields.map((field, index) => (
//               <div key={field.id} className="border p-4 rounded-lg space-y-2">
//                 <div className="flex justify-end">
//                   <button
//                     type="button"
//                     onClick={() => removeHidden(index)}
//                     className="btn btn-xs btn-error"
//                   >
//                     Remove
//                   </button>
//                 </div>
                
//                 <input
//                   {...register(`hiddenTestCases.${index}.input`)}
//                   placeholder="Input"
//                   className="input input-bordered w-full"
//                 />
                
//                 <input
//                   {...register(`hiddenTestCases.${index}.output`)}
//                   placeholder="Output"
//                   className="input input-bordered w-full"
//                 />
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Code Templates */}
//         <div className="card bg-base-100 shadow-lg p-6">
//           <h2 className="text-xl font-semibold mb-4">Code Templates</h2>
          
//           <div className="space-y-6">
//             {[0, 1, 2].map((index) => (
//               <div key={index} className="space-y-2">
//                 <h3 className="font-medium">
//                   {index === 0 ? 'C++' : index === 1 ? 'Java' : 'JavaScript'}
//                 </h3>
                
//                 <div className="form-control">
//                   <label className="label">
//                     <span className="label-text">Initial Code</span>
//                   </label>
//                   <pre className="bg-base-300 p-4 rounded-lg">
//                     <textarea
//                       {...register(`startCode.${index}.initialCode`)}
//                       className="w-full bg-transparent font-mono"
//                       rows={6}
//                     />
//                   </pre>
//                 </div>
                
//                 <div className="form-control">
//                   <label className="label">
//                     <span className="label-text">Reference Solution</span>
//                   </label>
//                   <pre className="bg-base-300 p-4 rounded-lg">
//                     <textarea
//                       {...register(`referenceSolution.${index}.completeCode`)}
//                       className="w-full bg-transparent font-mono"
//                       rows={6}
//                     />
//                   </pre>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         <button type="submit" className="btn btn-primary w-full">
//           Create Problem
//         </button>
//       </form>
//     </div>
//   );
// }

// export default AdminPanel;


import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axiosClient from '../utils/axiosClient';
import { useNavigate } from 'react-router';
import Select from 'react-select';
import {
  FileText,
  Tags,
  ListChecks,
  EyeOff,
  Code2,
  Plus,
  Trash2,
  Loader2,
  CircleAlert,
  Sparkles
} from 'lucide-react';

const problemSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  tags: z.array(z.string()).min(1, 'At least one tag is required'),
  visibleTestCases: z.array(
    z.object({
      input: z.string().min(1, 'Input is required'),
      output: z.string().min(1, 'Output is required'),
      explanation: z.string().min(1, 'Explanation is required')
    })
  ).min(1, 'At least one visible test case required'),
  hiddenTestCases: z.array(
    z.object({
      input: z.string().min(1, 'Input is required'),
      output: z.string().min(1, 'Output is required')
    })
  ).min(1, 'At least one hidden test case required'),
  startCode: z.array(
    z.object({
      language: z.enum(['C++', 'Java', 'JavaScript']),
      initialCode: z.string().min(1, 'Initial code is required')
    })
  ).length(3, 'All three languages required'),
  referenceSolution: z.array(
    z.object({
      language: z.enum(['C++', 'Java', 'JavaScript']),
      completeCode: z.string().min(1, 'Complete code is required')
    })
  ).length(3, 'All three languages required')
});

const DIFFICULTY_STYLES = {
  easy: 'text-emerald-600 border-emerald-200 bg-emerald-50 dark:bg-emerald-950/40 dark:border-emerald-900 dark:text-emerald-400',
  medium: 'text-amber-600 border-amber-200 bg-amber-50 dark:bg-amber-950/40 dark:border-amber-900 dark:text-amber-400',
  hard: 'text-rose-600 border-rose-200 bg-rose-50 dark:bg-rose-950/40 dark:border-rose-900 dark:text-rose-400'
};

function SectionCard({ icon: Icon, title, subtitle, children }) {
  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-visible">
      <div className="flex items-start gap-3 px-6 py-5 border-b border-slate-100 dark:border-slate-800">
        <div className="shrink-0 h-9 w-9 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center">
          <Icon className="h-4.5 w-4.5 text-indigo-600 dark:text-indigo-400" size={18} />
        </div>
        <div>
          <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">{title}</h2>
          {subtitle && <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{subtitle}</p>}
        </div>
      </div>
      <div className="p-6 space-y-5">{children}</div>
    </div>
  );
}

function FieldError({ error }) {
  if (!error) return null;
  return (
    <p className="flex items-center gap-1 text-xs text-rose-600 dark:text-rose-400 mt-1.5">
      <CircleAlert size={13} />
      {error.message}
    </p>
  );
}

const inputClass = (hasError) =>
  `w-full rounded-lg border ${
    hasError
      ? 'border-rose-300 dark:border-rose-800 focus:ring-rose-200'
      : 'border-slate-200 dark:border-slate-700 focus:ring-indigo-100 dark:focus:ring-indigo-900/50'
  } bg-white dark:bg-slate-950 px-3.5 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 outline-none focus:ring-4 focus:border-indigo-400 dark:focus:border-indigo-600 transition-shadow`;

function AdminPanel() {
  const navigate = useNavigate();
  const [availableTags, setAvailableTags] = useState([]);
  const [tagsLoading, setTagsLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    axiosClient.get('/problem/tags')
      .then((res) => setAvailableTags(res.data))
      .catch((err) => console.error('Failed to load tags:', err))
      .finally(() => setTagsLoading(false));
  }, []);

  const { register, control, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: zodResolver(problemSchema),
    defaultValues: {
      difficulty: 'easy',
      startCode: [
        { language: 'C++', initialCode: '' },
        { language: 'Java', initialCode: '' },
        { language: 'JavaScript', initialCode: '' }
      ],
      referenceSolution: [
        { language: 'C++', completeCode: '' },
        { language: 'Java', completeCode: '' },
        { language: 'JavaScript', completeCode: '' }
      ]
    }
  });

  const difficulty = watch('difficulty');

  const { fields: visibleFields, append: appendVisible, remove: removeVisible } = useFieldArray({
    control, name: 'visibleTestCases'
  });
  const { fields: hiddenFields, append: appendHidden, remove: removeHidden } = useFieldArray({
    control, name: 'hiddenTestCases'
  });

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      await axiosClient.post('/problem/create', data);
      alert('Problem created successfully!');
      navigate('/');
    } catch (error) {
      alert(`Error: ${error.response?.data?.message || error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-6xl mx-auto px-7 py-11">
        <div className="flex items-center gap-2.5 mb-1">
          <Sparkles className="text-indigo-600 dark:text-indigo-400" size={22} />
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Create new problem</h1>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
          Define the problem statement, test cases, and reference solutions in every language.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Information */}
          <SectionCard icon={FileText} title="Basic information" subtitle="Title, description, and difficulty">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Title</label>
              <input {...register('title')} placeholder="e.g. Two Sum" className={inputClass(errors.title)} />
              <FieldError error={errors.title} />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Description</label>
              <textarea
                {...register('description')}
                rows={5}
                placeholder="Explain what the problem is asking for..."
                className={inputClass(errors.description)}
              />
              <FieldError error={errors.description} />
            </div>

            <div className="flex gap-5 flex-wrap">
              <div className="flex-1 min-w-[220px]">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Difficulty</label>
                <div className="flex gap-2">
                  {['easy', 'medium', 'hard'].map((level) => (
                    <label
                      key={level}
                      className={`flex-1 text-center capitalize text-sm font-medium rounded-lg border py-2 cursor-pointer transition-colors ${
                        difficulty === level ? DIFFICULTY_STYLES[level] : 'border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-slate-300'
                      }`}
                    >
                      <input type="radio" value={level} {...register('difficulty')} className="sr-only" />
                      {level}
                    </label>
                  ))}
                </div>
                <FieldError error={errors.difficulty} />
              </div>

              <div className="flex-1 min-w-[220px]">
                <label className="flex items-center gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  <Tags size={14} /> Tags
                </label>
                {tagsLoading ? (
                  <div className="flex items-center gap-2 text-sm text-slate-400 py-2.5">
                    <Loader2 className="animate-spin" size={16} /> Loading tags...
                  </div>
                ) : (
                  <Controller
                    name="tags"
                    control={control}
                    render={({ field: { value = [], onChange } }) => (
                      <Select
                        isMulti
                        placeholder="Select tags..."
                        options={availableTags.map((tag) => ({ value: tag, label: tag }))}
                        value={value.map((tag) => ({ value: tag, label: tag }))}
                        styles={{   menuPortal: (base) => ({ ...base,zIndex: 9999,}),}}
                        onChange={(selected) => onChange(selected.map((s) => s.value))}
                        classNamePrefix="rs"
                        unstyled
                        classNames={{
                          control: () => `rounded-lg border ${errors.tags ? 'border-rose-300' : 'border-slate-200 dark:border-slate-700'} bg-white dark:bg-slate-950 px-1 py-0.5 text-sm`,
                          placeholder: () => 'text-slate-400 px-1.5',
                          multiValue: () => 'bg-indigo-50 dark:bg-indigo-950/60 rounded-md pl-2 pr-1 py-0.5 m-0.5 flex items-center gap-1',
                          multiValueLabel: () => 'text-indigo-700 dark:text-indigo-300 text-xs font-medium',
                          multiValueRemove: () => 'text-indigo-400 hover:text-rose-500 cursor-pointer ml-1',
                          menu: () => 'mt-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lg overflow-hidden py-1',
                          option: ({ isFocused }) => `px-3 py-2 text-sm cursor-pointer ${isFocused ? 'bg-indigo-50 dark:bg-indigo-950/60' : ''} text-slate-700 dark:text-slate-200`,
                          input: () => 'text-sm px-1.5'
                        }}
                      />
                    )}
                  />
                )}
                <FieldError error={errors.tags} />
              </div>
            </div>
          </SectionCard>

          {/* Test Cases */}
          <SectionCard icon={ListChecks} title="Visible test cases" subtitle="Shown to users on the problem page">
            {visibleFields.map((field, index) => (
              <div key={field.id} className="rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950/40 p-4 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-400">Case {index + 1}</span>
                  <button
                    type="button"
                    onClick={() => removeVisible(index)}
                    className="text-slate-400 hover:text-rose-500 transition-colors"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
                <textarea {...register(`visibleTestCases.${index}.input`)} placeholder="Input" className={inputClass()} />
                <textarea {...register(`visibleTestCases.${index}.output`)} placeholder="Output" className={inputClass()} />
                <textarea {...register(`visibleTestCases.${index}.explanation`)} placeholder="Explanation" rows={2} className={inputClass()} />
              </div>
            ))}
            <button
              type="button"
              onClick={() => appendVisible({ input: '', output: '', explanation: '' })}
              className="flex items-center gap-1.5 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700"
            >
              <Plus size={15} /> Add visible case
            </button>
          </SectionCard>

          <SectionCard icon={EyeOff} title="Hidden test cases" subtitle="Used for grading, not shown to users">
            {hiddenFields.map((field, index) => (
              <div key={field.id} className="rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950/40 p-4 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-400">Case {index + 1}</span>
                  <button
                    type="button"
                    onClick={() => removeHidden(index)}
                    className="text-slate-400 hover:text-rose-500 transition-colors"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
                <textarea {...register(`hiddenTestCases.${index}.input`)} placeholder="Input" className={inputClass()} />
                <textarea {...register(`hiddenTestCases.${index}.output`)} placeholder="Output" className={inputClass()} />
              </div>
            ))}
            <button
              type="button"
              onClick={() => appendHidden({ input: '', output: '' })}
              className="flex items-center gap-1.5 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700"
            >
              <Plus size={15} /> Add hidden case
            </button>
          </SectionCard>

          {/* Code Templates */}
          <SectionCard icon={Code2} title="Code templates" subtitle="Starter code and reference solution per language">
            <div className="space-y-6">
              {['C++', 'Java', 'JavaScript'].map((lang, index) => (
                <div key={lang}>
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {lang}
                    </span>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">Initial code</label>
                      <textarea
                        {...register(`startCode.${index}.initialCode`)}
                        rows={7}
                        className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-950 text-slate-100 font-mono text-xs p-3.5 outline-none focus:ring-4 focus:ring-indigo-900/40 focus:border-indigo-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">Reference solution</label>
                      <textarea
                        {...register(`referenceSolution.${index}.completeCode`)}
                        rows={7}
                        className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-950 text-slate-100 font-mono text-xs p-3.5 outline-none focus:ring-4 focus:ring-indigo-900/40 focus:border-indigo-600"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          <button
            type="submit"
            disabled={submitting}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold py-3.5 transition-colors"
          >
            {submitting && <Loader2 className="animate-spin" size={16} />}
            {submitting ? 'Creating problem...' : 'Create problem'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminPanel;