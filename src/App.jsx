import React from 'react'

import HomePage from './Pages/HomePage/HomePage'
import LessonPage from './Pages/lessons/LessonPage'
import SQLInjection from './Pages/lessons/Owasp_3/SQLInjection'
import BrokenAccControl from './Pages/lessons/Owasp_1/BrokenAccControl'
import DirectoryTraversal from './Pages/lessons/Owasp_1/DirectoryTraversal'

import ToggleColorMode from './assets/Themes/ThemeContext'
import { Route, Routes } from 'react-router-dom'
import { BrowserRouter } from "react-router-dom";
import CrossSiteRequestForgery from './Pages/lessons/Owasp_1/CrossSiteRequestForgery'
import UnencryptedCommunication from './Pages/lessons/Owasp_2/UnencryptedCommunication'
import CommandInjection from './Pages/lessons/Owasp_3/CommandInjection'
import InsecureDesign from './Pages/lessons/Owasp_4/InsecureDesign'
import InformationLeakage from './Pages/lessons/Owasp_4/InformationLeakage'
import FileUploadVulnerabilities from './Pages/lessons/Owasp_4/FileUploadVulnerabilities'
import LaxSecuritySetting from './Pages/lessons/Owasp_5/LaxSecuritySettings'
import ToxicDependencies from './Pages/lessons/Owasp_6/ToxicDependencies'
import PasswordMismanagement from './Pages/lessons/Owasp_7/PasswordMismanagement'
import PrivilegeEscalation from './Pages/lessons/Owasp_7/PrivilegeEscalation'
import SessionFixation from './Pages/lessons/Owasp_7/SessionFixation'
import UserEnumberation from './Pages/lessons/Owasp_7/UserEnumeration'
import WeakSessionIds from './Pages/lessons/Owasp_7/WeakSessionIds'
import SoftwareAndDataIntegrityFailures from './Pages/lessons/Owasp_8/SoftwareAndDataIntegrityFailures'
import LoggingAndMonitoringFailures from './Pages/lessons/Owasp_9/LoggingAndMonitoringFailures'
import ServerSideRequestForgery from './Pages/lessons/Owasp_10/ServerSideRequestForgery'


import RegisterPage from './Login/ReigisterPage'
import Overview from './Pages/Dashboard/Pages/Overview'
import ApplicationIssues from './Pages/Dashboard/Pages/FindingIssue/ApplicationIssues'
import Issue1 from './Pages/Dashboard/Pages/FindingIssue/Vulnerabilities/issue1'
import FeedbackModal from './Pages/User/page/Page/FeedbackModal'
import QuizPage from './Pages/Quiz/Page/QuizPage'
import ScoreBoard from './Pages/Quiz/Page/ScoreBoard'
import LoginPage from './Login/LoginPage'
import ProtectedRoute from './Login/Component/ProtectedRoute'
import UpdateProfile from './Pages/User/page/Page/UpdateProfile'
import ProfilePage from './Pages/User/page/Page/ProfilePage'
import AdminMain from './Login/AdminMain'
import AddUser from './Pages/Admin/Pages/AddUser'
import AddVulnerability from './Pages/Admin/Pages/AddVulnerability'
import ApplicationManagement from './Pages/Admin/Pages/FindingIssue/ApplicationManagement'
import { UserProvider } from './Login/Component/UserAuthen'
import { AuthProvider } from './Login/Component/AuthContext'
import DynamicVulPage from './Pages/CodeExample/Page/DynamicVulPage'
import FindingIssue from './Pages/Admin/Pages/FindingIssue/FindingIssue'

export default function App() {

  return (
    <UserProvider>
    <AuthProvider>
    <BrowserRouter> 
    <ToggleColorMode> 
      <Routes>
      <Route path="/FeedbackModal" element={<FeedbackModal />}></Route>
  
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/LessonPage" element={<LessonPage />}></Route>
        <Route path="/LessonPage/BrokenAccControl" element={<BrokenAccControl />}></Route>
        <Route path="/LessonPage/DirectoryTraversal" element={<DirectoryTraversal />}></Route>
        <Route path="/LessonPage/CrossSiteRequestForgery" element={<CrossSiteRequestForgery />}></Route>
        <Route path="/LessonPage/UnencryptedCommunication" element={<UnencryptedCommunication />}></Route>
        <Route path="/LessonPage/CommandInjection" element={<CommandInjection />}></Route>
        <Route path="/LessonPage/SQLInjection" element={<SQLInjection />}></Route>
        <Route path="/LessonPage/InsecureDesign" element={<InsecureDesign />}></Route>
        <Route path="/LessonPage/InformationLeakage" element={<InformationLeakage />}></Route>
        <Route path="/LessonPage/FileUploadVulnerabilities" element={<FileUploadVulnerabilities />}></Route>
        <Route path="/LessonPage/LaxSecuritySettings" element={<LaxSecuritySetting />}></Route>
        <Route path="/LessonPage/ToxicDependencies" element={<ToxicDependencies />}></Route>
        <Route path="/LessonPage/PasswordMismanagement" element={<PasswordMismanagement />}></Route>
        <Route path="/LessonPage/PrivilegeEscalation" element={<PrivilegeEscalation />}></Route>
        <Route path="/LessonPage/SessionFixation" element={<SessionFixation />}></Route>
        <Route path="/LessonPage/UserEnumeration" element={<UserEnumberation />}></Route>
        <Route path="/LessonPage/WeakSessionIds" element={<WeakSessionIds />}></Route>
        <Route path="/LessonPage/SoftwareAndDataIntegrityFailures" element={<SoftwareAndDataIntegrityFailures />}></Route>
        <Route path="/LessonPage/LoggingAndMonitoringFailures" element={<LoggingAndMonitoringFailures/>}></Route>
        <Route path="/LessonPage/ServerSideRequestForgery" element={<ServerSideRequestForgery />}></Route>
        
        
        {/* <Route path='/CodeExample/BrokenCode/*' element={<BrokenCode />}></Route> */}
        <Route path="/vulnerabilities/:issueName" element={<DynamicVulPage />} />

        <Route path='/Quiz' element={<QuizPage />}></Route>
        <Route path='/ScoreBoard' element={<ScoreBoard />}></Route>
        
        
        
        <Route path='/admin' element={<AdminMain />}></Route>
        <Route path='/admin/AddUser' element={<AddUser />}></Route>
        <Route path='/admin/AddVulnerability' element={<AddVulnerability />}></Route>
        <Route path="/admin/ApplicationManagement" element={<ApplicationManagement />} />
        <Route path="/admin/FindingIssue" element={<FindingIssue />} />

        



        <Route path="/RegisterPage" element={<RegisterPage />} />
        <Route path="/LoginPage" element={<LoginPage />} />


        <Route path="/ProfilePage" element={<ProfilePage />} />
        <Route path="/UpdateProfile" element={<UpdateProfile />} />


        <Route path="/Overview" element={<Overview />} />
        <Route path="/applicationIssues" element={<ApplicationIssues />} />
        <Route path="/applicationIssues/issue1" element={<Issue1 />} />

      </Routes>
      </ToggleColorMode>
    </BrowserRouter>
    </AuthProvider>
    </UserProvider>

  )

}


