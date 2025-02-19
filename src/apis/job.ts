import { useRecoilValue } from "recoil";
import { accessTokenState } from "../store/store";

type CreateJobProps = {
  seniorId: number,
  hourlyWage: number,
  caregiverCount: number,
  schedule: Map<string, { startTime: string; endTime: string }>,
  mealAssist: boolean,
  toiletAssist: boolean,
  movingAssist: boolean,
  bathingAssist: boolean,
  livingAssist: boolean
}


const useJob = () => {
  const apiURL = process.env.REACT_APP_API_URL;
  const accessToken = useRecoilValue(accessTokenState);

  const createJobOffer = async ({ seniorId, hourlyWage, caregiverCount, schedule, mealAssist, toiletAssist, movingAssist, bathingAssist, livingAssist }: CreateJobProps) => {
    // console.log(JSON.stringify(Object.fromEntries(schedule)));
    return await fetch(`${apiURL}/manager/createJobOffer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
      },
      body: JSON.stringify(
        {
          seniorId: seniorId,
          offerPay: hourlyWage,
          wantRecruits: caregiverCount,
          jobOfferSchedule: schedule,
          isFeedingAssistanceNeeded: mealAssist,
          isToiletingAssistanceNeeded: toiletAssist,
          isMobilityAssistanceNeeded: movingAssist,
          isBathingAssistanceNeeded: bathingAssist,
          isDailyLivingSupportNeeded: livingAssist,

          "isOralCareAssistanceNeeded": false, // 구강 청결 도움
          "isGroomingAssistanceNeeded": false, // 몸단장
          "isDressingAssistanceNeeded": false, // 옷 갈아입기 도움
          "isHairWashingAssistanceNeeded": false, // 머리 감기 도움
          "isBodyWashingAssistanceNeeded": false, // 몸 씻기 도움
          "isPositionChangeAssistanceNeeded": false, // 체위 변경 도움
          "isPhysicalFunctionSupportNeeded": false, // 신체 기능 유지 및 증진
          "isCognitiveStimulationNeeded": false, // 인지 자극 활동
          "isCognitiveBehaviorManagementNeeded": false, // 인지 행동 변화 관리
          "isCommunicationSupportNeeded": false, // 의사소통 도움 (말벗 및 격려 등)
          "isPersonalActivitySupportNeeded": false, // 개인 활동 지원
          "isHousekeepingSupportNeeded": false // 식사 준비, 청소, 주변 정돈, 세탁
        }
      ),
    })
      .then((response) => {
        // if (!response.ok) {
        //   throw new Error("Network response was not ok");
        // }
        return response.json();
      })
      .then((result) => {
        console.log(result);
        if (result.jobOffer) {
          return result.jobOffer.jobOfferId;
        }
        return null;
      });
  }

  return { createJobOffer };
}

export default useJob;
