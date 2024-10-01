import React, { useState } from "react";
import PersonalDetail from "./forms/PersonalDetail";
import { Button } from "../../../components/ui/button";
import { ArrowLeft, ArrowRight, HomeIcon, LayoutGrid } from "lucide-react";
import Summery from "./forms/Summery";
import { motion } from "framer-motion";
import Experience from "./forms/Experience";
import Education from "./forms/Education";
import Skills from "./forms/Skills";
import { Link, Navigate, useParams } from "react-router-dom";
import ThemeColor from "./ThemeColor";
const FormSection = () => {
  const [activeIndexFormIndex, setActiveIndexFormIndex] = useState(1);
  const { resumeId } = useParams();
  const [isNext, setIsNext] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -500, rotate: -90 }}
      animate={{ opacity: 1, x: 0, rotate: 0 }}
      transition={{
        duration: 0.65,
      }}
    >
      <div className="flex justify-between items-center">
        <div className="gap-2 flex">
          <Link to={"/dashboard"}>
            <Button>
              <HomeIcon />
            </Button>
          </Link>
          <ThemeColor />
        </div>
        <div className="flex gap-1">
          {activeIndexFormIndex > 1 && (
            <Button
              onClick={() => setActiveIndexFormIndex(activeIndexFormIndex - 1)}
              size="sm"
              className="bg-gray-100"
              variant="outline"
            >
              <ArrowLeft />
            </Button>
          )}

          {/* disabled={loading} */}
          <Button
            onClick={() => setActiveIndexFormIndex(activeIndexFormIndex + 1)}
            className="flex gap-2"
            size="sm"
          >
            Next <ArrowRight />
          </Button>
        </div>
      </div>

      {/* Personal Detail  */}

      {activeIndexFormIndex == 1 ? (
        <PersonalDetail isNext={(v) => setIsNext(v)} />
      ) : null}

      {/* Summery */}

      {activeIndexFormIndex == 2 ? (
        <Summery isNext={(v) => setIsNext(v)} />
      ) : null}

      {/* Experience */}

      {activeIndexFormIndex == 3 ? <Experience /> : null}

      {/* educational Detail */}

      {activeIndexFormIndex == 4 ? <Education /> : null}

      {/* Skills */}

      {activeIndexFormIndex == 5 ? <Skills /> : null}

      {activeIndexFormIndex == 6 ? (
        <Navigate to={"/my-resume/" + resumeId + "/view"}></Navigate>
      ) : null}
    </motion.div>
  );
};

export default FormSection;
