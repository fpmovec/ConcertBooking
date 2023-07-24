import { ClassicsList, OpenAirsList, PartysList } from "../../Components/Concert/ConcertList";
import { Page } from "../../Page/Page";
import { PageTitle } from "../../Page/PageTitle";
import { classics, openAirs, partys } from "../../Models/MockData";
import { TypeCheckbox } from "../../Components/SortPanel/SortPanel";
import { useState } from "react";

export interface IConcertType {
  classics: boolean;
  partys: boolean;
  openAirs: boolean;
}

export const HomePage = () => {
  const [party, setParty] = useState<boolean>(false);
  const [classic, setClassic] = useState<boolean>(false);
  const [openAir, setOpenAir] = useState<boolean>(false);

  const handleClassicChange = () => {
    setClassic(!classic);
  };

  const handlePartyChange = () => setParty(!party);
  const handleOpenAirChange = () => setOpenAir(!openAir);

  return (
    <>
      <div>
        <TypeCheckbox
          value={classic}
          label="Classics"
          handleChange={handleClassicChange}
        />
         <TypeCheckbox
          value={party}
          label="Partys"
          handleChange={handlePartyChange}
        />
         <TypeCheckbox
          value={openAir}
          label="OpenAirs"
          handleChange={handleOpenAirChange}
        />
      </div>
      <div>
        { party && <PartysList data={partys} />}
        { classic && <ClassicsList data={classics} />}
        { openAir && <OpenAirsList data={openAirs}/>}
        
      </div>
    </>
  );
};
