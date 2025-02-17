import { useRecoilValue } from "recoil";
import { accessTokenState } from "../store/store";

type CreateJobProps = {
  seniorId: number,
  hourlyWage: number,
  caregiverCount: number,
  mealAssist: boolean,
  toiletAssist: boolean,
  movingAssist: boolean,
  bathingAssist: boolean,
  livingAssist: boolean
}


const useJob = () => {
  const accessToken = useRecoilValue(accessTokenState);

  const createJob = async ({ seniorId, hourlyWage, caregiverCount, mealAssist, toiletAssist, movingAssist, bathingAssist, livingAssist }: CreateJobProps) => {
    return await fetch("/api/manager/addSenior", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        "Authorization": `Bearer ${accessToken}`
      },
      body: JSON.stringify(
        {
          seniorId: seniorId,
          offerPay: hourlyWage,
          wantRecruits: caregiverCount,
          jobOfferSchedule: [],
          isFeedingAssistanceNeeded: mealAssist,
          isToiletingAssistanceNeeded: toiletAssist,
          isMobilityAssistanceNeeded: movingAssist,
          isBathingAssistanceNeeded: bathingAssist,
          isDailyLivingSupportNeeded: livingAssist,
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
        if (result.message !== "") {
          return true;
        }
        return false;
      });
  }

  return { createJob };
}

export default useJob;
