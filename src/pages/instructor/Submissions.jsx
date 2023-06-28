import { useEffect, useState } from "react";
import lectureServices from "../../services/lectureServices";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Avatar from "../../components/common/Avatar";

const Submissions = () => {

  const [question, SetQuestion] = useState();
  const [tab, setTab] = useState('completed')
  const {classId, assignmentId} = useParams();
  const { currentClass } = useSelector(store => store.classes)
  const [students, setStudents] = useState();

  function filterStudents(students, submissions) {
    const completed = students?.reduce((acc, student) => {
      const studentSubmission = submissions.find(submission => submission.student._id === student._id);
      if (studentSubmission) {
        const studentWithSubmission = { ...student, submissionId: studentSubmission._id };
        return [...acc, studentWithSubmission];
      }
      return acc;
    }, []);
  
    const notCompleted = students.filter(student => !completed.some(completedStudent => completedStudent._id === student._id));
    setStudents({
      completed,
      notCompleted
    });
  }
  
 
  useEffect(()=>{
    lectureServices.allSubmissions(classId, assignmentId).then(res=>{
      if(res?.success){
        filterStudents(currentClass?.students, res?.success?.submissions)
        if (res?.success?.submissions.length > 0) {
          SetQuestion(res?.success?.submissions[0]?.assignmentId)
        }
      }
    })
  },[assignmentId, classId, currentClass?.students])

  return (
   <div className="relative grid gap-2">
    <div className="bg-tileColor px-3 py-2">
      <p className="font-bold text-textColor uppercase">{question?.title}</p>
      <p className="text-gray-500 text-[12px] mt-1">{question?.description}</p>
    </div>
    <div className="box">
      <ul className="flex text-[12px] font-mono gap-2">
        <li className={`p-1 cursor-pointer border-2 border-transparent ${tab === 'completed' && 'border-b-primary'} font-bold text-textColor`} onClick={()=>setTab('completed')}>Completed</li>
        <li className={`p-1 cursor-pointer border-2 border-transparent ${tab === 'notCompleted' && 'border-b-primary'} font-bold text-textColor`} onClick={()=>setTab('notCompleted')}>Not Completed</li>
      </ul>
    </div>

    {
      students && students[tab]?.map(student =>(
        <div className="bg-tileColor transitions shadow-inner hover:shadow border-white border-2 p-1 md:p-3 flex justify-between items-center" key={student._id}>
        <div className="flex items-center gap-5">
          <Avatar image={student?.avatar} name={student.name}/>
          <p className="font-bold  text-textColor">{student.name}</p>
        </div>
        { tab === 'completed' && <div className="flex gap-2 md:gap-4">
          <Link to={student?.submissionId} className="bg-white text-textColor font-bold text-sm px-3 py-2 rounded hover:shadow hover:shadow-shadow">
            <i className="fa-solid fa-eye md:me-2"></i>
            <span>VIEW</span>
          </Link>
        </div>}
      </div>
      ))
    }  
   </div>
  )
};

export default Submissions;