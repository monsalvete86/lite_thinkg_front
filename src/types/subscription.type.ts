export default interface ISubscription {
    id?: number | null,
    migratoryProcess?: string,
    annualIncome?: number,
    mainContributor?: string,
    jobType?: string,
    occupation?: string,
    jointTaxes?: string,
    whoClaimsTemplates?: string,
    insurance?: string,
    monthlyPremium?: number,
    maximumSpend?: number,
    annualDeductible?: number,
    genericDrug?: number,
    primaryDoctor?: number,
    medicalSpecialist?: number,
    emergencyRoom?: number,
    subsidy?: number,
    clientAnnotations?: string,
    callcenterAnnotations?: string,
    audio?: string,
    state?: string,
    startCoverage: string,
    endCoverage: string,
    processorId?: number,
    clientListId?: number,
}