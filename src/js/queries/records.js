import gql from "graphql-tag";

export const all_records = gql`
    query{
        getPeople{
            objectId
            fname
            lname
            nickname
            sex
            dob
            age
            telephoneNumber
            educationLevel
            occupation
            communityname
            city
            province
            insuranceNumber
            insuranceProvider
            clinicProvider
            cedulaNumber
            surveyingUser
            surveyingOrganization
            latitude
            longitude
            createdAt
            updatedAt
        }
    }
`;

export const allEvalMedicals = gql`
    query{
        getEvalMedicalRecords{
            objectId
            fname
            lname
            nickname
            sex
            dob
            age
            telephoneNumber
            educationLevel
            occupation
            communityname
            city
            province
            insuranceNumber
            insuranceProvider
            clinicProvider
            cedulaNumber
            surveyingUser
            surveyingOrganization
            latitude
            longitude
            
            chronic_condition_diabetes
            chronic_condition_hypertension
            chronic_condition_other
            seen_doctor
            received_treatment_notes
            received_treatment_description
            receiving_treatment_support_required
            part_of_body
            part_of_body_description
            duration
            trauma_induced
            condition_progression
            notes
            AssessmentandEvaluation
            AssessmentandEvaluation_Surgical
            AssessmentandEvaluation_Surgical_Guess
            immediate_follow_up
            planOfAction
            createdAt
            updatedAt
        }
    }
`;

export const allEnvs = gql`
    query{
        getEnvRecords{
            objectId
            fname
            lname
            nickname
            sex
            dob
            age
            telephoneNumber
            educationLevel
            occupation
            communityname
            city
            province
            insuranceNumber
            insuranceProvider
            clinicProvider
            cedulaNumber
            surveyingUser
            surveyingOrganization
            latitude
            longitude
            
            yearsLivedinthecommunity
            yearsLivedinThisHouse
            waterAccess
            typeofWaterdoyoudrink
            bathroomAccess
            latrineAccess
            clinicAccess
            conditionoRoofinyourhouse
            conditionoFloorinyourhouse
            medicalproblemswheredoyougo
            dentalproblemswheredoyougo
            biggestproblemofcommunity
            timesperweektrashcollected
            wheretrashleftbetweenpickups
            numberofIndividualsLivingintheHouse
            numberofChildrenLivinginHouseUndertheAgeof5
            houseownership
            createdAt
            updatedAt
        }
    }
`;

export const first_last_names = gql`
    query {
        getPeople{
            fname
            lname
        }
    }
`;

export const age_sex_chronic = gql`
    query{
        getEvalMedicalRecords{
            dob
            chronic_condition_diabetes
            chronic_condition_hypertension
            chronic_condition_other
            sex
        }
    }
`;

export const env_age_latrines_clinic = gql`
    query{
        getEnvRecords{
            sex
            dob
            bathroomAccess
            latrineAccess
            clinicAccess
            numberofIndividualsLivingintheHouse
            numberofChildrenLivinginHouseUndertheAgeof5
        }
    }
`;

export const vitals = gql`
  query{
    getVitals{
            sex
            dob
            bmi
            bloodSugar
            bloodPressure
            Systolic
            Diastolic
            
        }
    }  
`;

export const allRecordsByOrganization = gql`
    query($organization: String!){
        getPeopleByOrganization(organization: $organization){
            objectId
            fname
            lname
            nickname
            sex
            dob
            age
            telephoneNumber
            educationLevel
            occupation
            communityname
            city
            province
            insuranceNumber
            insuranceProvider
            clinicProvider
            cedulaNumber
            surveyingUser
            surveyingOrganization
            latitude
            longitude
            createdAt
            updatedAt
        }
    }
`;
export const allVitalsByOrganization = gql`
    query($organization: String!){
        getVitalByOrganization(organization: $organization){
            objectId
            fname
            lname
            nickname
            sex
            dob
            age
            telephoneNumber
            educationLevel
            occupation
            communityname
            city
            province
            insuranceNumber
            insuranceProvider
            clinicProvider
            cedulaNumber
            surveyingUser
            surveyingOrganization
            latitude
            longitude

            bmi
            bloodSugar
            bloodOxygen
            bloodPressure
            Systolic
            Diastolic
            temp
            pulse
            hemoglobinLevels
            painLevels
            createdAt
            updatedAt
        }
    }  
`;

export const allEnvsByOrganization = gql`
    query($organization: String!){
        getEnvByOrganization(organization: $organization){
            objectId
            fname
            lname
            nickname
            sex
            dob
            age
            telephoneNumber
            educationLevel
            occupation
            communityname
            city
            province
            insuranceNumber
            insuranceProvider
            clinicProvider
            cedulaNumber
            surveyingUser
            surveyingOrganization
            latitude
            longitude
            
            yearsLivedinthecommunity
            yearsLivedinThisHouse
            waterAccess
            typeofWaterdoyoudrink
            bathroomAccess
            latrineAccess
            clinicAccess
            conditionoRoofinyourhouse
            conditionoFloorinyourhouse
            medicalproblemswheredoyougo
            dentalproblemswheredoyougo
            biggestproblemofcommunity
            timesperweektrashcollected
            wheretrashleftbetweenpickups
            numberofIndividualsLivingintheHouse
            numberofChildrenLivinginHouseUndertheAgeof5
            houseownership
            createdAt
            updatedAt
        }
    }  
`;

export const allEvalMedicalsByOrganization = gql`
    query($organization: String!){
        getEvalMedicalByOrganization(organization: $organization){
            objectId
            fname
            lname
            nickname
            sex
            dob
            age
            telephoneNumber
            educationLevel
            occupation
            communityname
            city
            province
            insuranceNumber
            insuranceProvider
            clinicProvider
            cedulaNumber
            surveyingUser
            surveyingOrganization
            latitude
            longitude
            
            chronic_condition_diabetes
            chronic_condition_hypertension
            chronic_condition_other
            seen_doctor
            received_treatment_notes
            received_treatment_description
            receiving_treatment_support_required
            part_of_body
            part_of_body_description
            duration
            trauma_induced
            condition_progression
            notes
            AssessmentandEvaluation
            AssessmentandEvaluation_Surgical
            AssessmentandEvaluation_Surgical_Guess
            immediate_follow_up
            planOfAction
            createdAt
            updatedAt
        }
    }  
`;


export const allHistoryMedicalsByOrganization = gql`
    query($organization: String!){
        getMedHistoryByOrganization(organization: $organization){
            objectId
            fname
            lname
            nickname
            sex
            dob
            age
            telephoneNumber
            educationLevel
            occupation
            communityname
            city
            province
            insuranceNumber
            insuranceProvider
            clinicProvider
            cedulaNumber
            surveyingUser
            surveyingOrganization
            latitude
            longitude
            
            surgeryWhatKind
            medicalIllnesses
            whenDiagnosed
            whatDoctorDoyousee
            majorEvents
            treatment
            familyhistory
            preventativeCare
            
            createdAt
            updatedAt
        }
    }  
`;


export const personalVitals = gql`
    query($id:String!){
        getPersonVitals(id:$id){
            bmi
            bloodSugar
            bloodOxygen
            bloodPressure
            Systolic
            Diastolic
            temp
            pulse
            hemoglobinLevels
            painLevels
        }
    }  
`;

export const personalEvaluationMedical = gql`
    query($id:String!){
        getPersonEvalMedical(id:$id){
            chronic_condition_diabetes
            chronic_condition_hypertension
            chronic_condition_other
            seen_doctor
            received_treatment_notes
            received_treatment_description
            receiving_treatment_support_required
            part_of_body
            part_of_body_description
            duration
            trauma_induced
            condition_progression
            notes
            AssessmentandEvaluation
            AssessmentandEvaluation_Surgical
            AssessmentandEvaluation_Surgical_Guess
            immediate_follow_up
            planOfAction
            createdAt
            updatedAt
        }
    }  
`;

export const personalEnvironmentalHealth = gql`
    query($id:String!){
        getPersonEnv(id:$id){
            yearsLivedinthecommunity
            yearsLivedinThisHouse
            waterAccess
            typeofWaterdoyoudrink
            bathroomAccess
            latrineAccess
            clinicAccess
            conditionoRoofinyourhouse
            conditionoFloorinyourhouse
            medicalproblemswheredoyougo
            dentalproblemswheredoyougo
            biggestproblemofcommunity
            timesperweektrashcollected
            wheretrashleftbetweenpickups
            numberofIndividualsLivingintheHouse
            numberofChildrenLivinginHouseUndertheAgeof5
            houseownership
        }
    }  
`;
