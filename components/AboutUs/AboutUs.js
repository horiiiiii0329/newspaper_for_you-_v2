import SectionHeader from "../UI/SectionHeader";
import SectionLayout from "../Layout/SectionLayout";
import styles from "./AboutUs.module.scss";
import { useState } from "react";

function AboutUs() {
  const [isActive, setisActive] = useState(false);

  return (
    <section className={`${styles.section} ${isActive && styles.slideIn}`}>
      <SectionHeader
        number="04"
        title="ポリシー"
        onClick={() => setisActive(!isActive)}
      />
    </section>
  );
}

export default AboutUs;
