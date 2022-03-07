import gql from "graphql-tag";

export const all_records = gql`
    query{
        getPeople{
            objectId
            fname
            lname
            relationship
            nickname
            sex
            dob
            age
            telephoneNumber
            educationLevel
            occupation
            communityname
            subcounty
            city
            province
            region
            country
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
            relationship
            nickname
            sex
            dob
            age
            telephoneNumber
            educationLevel
            occupation
            communityname
            subcounty
            city 
            province 
            region
            country
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
            surveyingUserSupplementary
        }
    }
`;

export const allEnvs = gql`
    query{
        getEnvRecords{
            objectId
            fname
            lname
            relationship
            nickname
            sex
            dob
            age
            telephoneNumber
            educationLevel
            occupation
            communityname
            subcounty
            city 
            province 
            region
            country
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
            bathroomAccess_v2
            latrineAccess
            clinicAccess
            clinicAccess_v2
            conditionoRoofinyourhouse
            conditionoFloorinyourhouse
            medicalproblemswheredoyougo
            dentalproblemswheredoyougo
            biggestproblemofcommunity
            biggestproblemofcommunity_v2
            timesperweektrashcollected
            wheretrashleftbetweenpickups
            numberofIndividualsLivingintheHouse
            numberofChildrenLivinginHouseUndertheAgeof5
            numberofChildrenLivinginHouseUndertheAgeof5_v2
            houseownership
            stoveType
            govAssistance
            foodSecurity
            electricityAccess
            houseMaterial
            createdAt
            updatedAt
            surveyingUserSupplementary
            floorMaterial
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
            height
            weight
            respRate
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
            relationship
            nickname
            sex
            dob
            age
            telephoneNumber
            educationLevel
            occupation
            communityname
            subcounty
            city 
            province 
            region
            country
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
            relationship
            nickname
            sex
            dob
            age
            telephoneNumber
            educationLevel
            occupation
            communityname
            subcounty
            city 
            province 
            region
            country
            insuranceNumber
            insuranceProvider
            clinicProvider
            cedulaNumber
            surveyingUser
            surveyingOrganization
            latitude
            longitude

            height
            weight
            respRate
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
            surveyingUserSupplementary
        }
    }  
`;

export const allEnvsByOrganization = gql`
    query($organization: String!){
        getEnvByOrganization(organization: $organization){
            objectId
            fname
            lname
            relationship
            nickname
            sex
            dob
            age
            telephoneNumber
            educationLevel
            occupation
            communityname
            subcounty
            city 
            province 
            region
            country
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
            bathroomAccess_v2
            latrineAccess
            clinicAccess
            clinicAccess_v2
            conditionoRoofinyourhouse
            conditionoFloorinyourhouse
            medicalproblemswheredoyougo
            dentalproblemswheredoyougo
            biggestproblemofcommunity
            biggestproblemofcommunity_v2
            timesperweektrashcollected
            wheretrashleftbetweenpickups
            numberofIndividualsLivingintheHouse
            numberofChildrenLivinginHouseUndertheAgeof5
            numberofChildrenLivinginHouseUndertheAgeof5_v2
            houseownership
            stoveType
            govAssistance
            foodSecurity
            electricityAccess
            houseMaterial
            createdAt
            updatedAt
            surveyingUserSupplementary
            floorMaterial
        }
    }  
`;

export const allEvalMedicalsByOrganization = gql`
    query($organization: String!){
        getEvalMedicalByOrganization(organization: $organization){
            objectId
            fname
            lname
            relationship
            nickname
            sex
            dob
            age
            telephoneNumber
            educationLevel
            occupation
            communityname
            subcounty
            city 
            province 
            region
            country
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
            surveyingUserSupplementary
        }
    }  
`;


export const allHistoryMedicalsByOrganization = gql`
    query($organization: String!){
        getMedHistoryByOrganization(organization: $organization){
            objectId
            fname
            lname
            relationship
            nickname
            sex
            dob
            age
            telephoneNumber
            educationLevel
            occupation
            communityname
            subcounty
            city 
            province 
            region
            country
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
            height
            weight
            respRate
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
            surveyingUserSupplementary
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
            surveyingUserSupplementary
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
            stoveType
            govAssistance
            foodSecurity
            electricityAccess
            houseMaterial
            surveyingUserSupplementary
            floorMaterial
        }
    }  
`;

export const allCustomSpecs = gql`
    query{
        getCustomFormSpec{
            objectId
            name
            organizations
            typeOfForm
            active
            fields{
                label
                options {
                    label
                    value
                }
            }
        }
    }  
`;

export const allCustomResults = gql`
    query{
        getCustomFormResults{
            objectId
            title
            surveyingUser
            surveyingUserCustomForm
            surveyingOrganization
            surveyingOrganizationCustomForm
            createdAt
            createdAtCustomForm
            fields {
                title
                answer
            }
        }
    }  
`;

export const allCustomResultsByFormId = gql`
    query($id:String!){
        getCustomFormResultsbyId(id:$id){
            objectId
            fname
            lname
            relationship
            nickname
            sex
            dob
            age
            telephoneNumber
            educationLevel
            occupation
            communityname
            subcounty
            city 
            province 
            region
            country
            insuranceNumber
            insuranceProvider
            clinicProvider
            cedulaNumber
            surveyingUser
            surveyingUserCustomForm
            surveyingOrganization
            surveyingOrganizationCustomForm
            createdAt
            createdAtCustomForm
            latitude
            longitude
            title
            fields {
                title
                answer
            }
        }
    }  
`;


export const allAssetResultsByOrganization = gql`
    query($organization: String!){
        getAssetRecordsByOrganization(organization: $organization){
            objectId
            altitude
            city
            communityName
            latitude
            longitude
            createdAt
            name
            province
            relatedPeople{
              firstName
              lastName
              relationship
            }
            surveyingOrganization
      
      
            FormAssetResultId
            surveyingOrganizationAssetForm
            createdAtAssetForm
      
            formSpecifications
            title
            description
            fields{
              title
              answer
            }
        }
    }  
`;

export const allAssetResultsByFormId = gql`
    query($id:String!){
        getAssetSuppById(id:$id){
            objectId
            name
            communityName 
            city 
            province 
            latitude
            longitude 
            altitude
            surveyingOrganization
            surveyingOrganizationAssetSupForm
            createdAt
            createdAtAssetSupForm
            fields {
                title
                answer
            }
        }
    }  
`;

export const allAssetIdResultsByOrganization = gql`
    query($organization:String!){
        getAssetIdsByOrganization(organization: $organization){
            objectId
            name
            communityName
            communityname
            city
            province 
            country 
            surveyingOrganization 
    
            latitude 
            longitude
            altitude
    
            createdAt
            updatedAt
    
            phoneOS
            surveyingUser
            appVersion
            relatedPeople
        }
    }
`;