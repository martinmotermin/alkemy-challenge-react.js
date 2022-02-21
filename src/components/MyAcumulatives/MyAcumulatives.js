import React, { useContext, useEffect, useState } from "react";
import { MenuContext } from "../menuContext/MenuContextProvider";
import CountUp from "react-countup";
import { BsCashCoin } from "react-icons/bs";
import { MdOutlineTimer } from "react-icons/md";
import { GiHealthDecrease, GiHealthIncrease } from "react-icons/gi";
import { IoMdStats } from "react-icons/io";

import "./MyAcumulatives.css";

export const MyAcumulatives = () => {
  const { myMenuList } = useContext(MenuContext);
  const [myAcumulatives, setMyAcumulatives] = useState({
    price: 0,
    time: 0,
    healthScore: 0,
  });

  useEffect(() => {
    const transformedMenuList = myMenuList.map((menu) => ({
      price: menu.pricePerServing * menu.servings,
      time: menu.readyInMinutes,
      healthScore: menu.healthScore,
    }));

    const totalPrice = transformedMenuList.reduce(
      (sum, value) =>
        typeof value.price == "number" ? sum + value.price : sum,
      0
    );

    const totalTime = transformedMenuList.reduce(
      (sum, value) => (typeof value.time == "number" ? sum + value.time : sum),
      0
    );

    const totalHealthScore = transformedMenuList.reduce(
      (sum, value) =>
        typeof value.healthScore == "number" ? sum + value.healthScore : sum,
      0
    );

    setMyAcumulatives({
      price: totalPrice.toFixed(2),
      time: totalTime / myMenuList.length,
      healthScore: totalHealthScore / myMenuList.length,
    });
  }, [myMenuList]);

  return (
    <div className="container">
      <h1>
        <IoMdStats />
        Mis Acumulativos
      </h1>

      <div className="acumulatives__content">
        <div className="acumulativeCard priceCard">
          <div className="acumulativeCard-value">
            <CountUp
              delay={3}
              start={0}
              end={myAcumulatives.price}
              duration={5}
              separator=" "
              prefix="$ "
              decimals={2}
              decimal=","
              useEasing={true}
            />
            <h5 className="priceCard-title text-muted">
              Precio total * personas
            </h5>
          </div>
          <div className="svg__wrapper">
            <BsCashCoin />
          </div>
        </div>

        <div className="acumulativeCard timeCard">
          <div className="acumulativeCard-value">
            <CountUp
              delay={3}
              start={0}
              end={myAcumulatives.time}
              duration={4}
              suffix=" min."
              separator=" "
              decimal=","
              useEasing={true}
            />
            <h5 className="timeCard-title text-muted">
              Promedio de preparacion
            </h5>
          </div>
          <div className="svg__wrapper">
            <MdOutlineTimer />
          </div>
        </div>

        <div className="acumulativeCard healthScoreCard">
          <div className="acumulativeCard-value">
            <CountUp
              delay={3}
              start={0}
              end={myAcumulatives.healthScore}
              duration={3}
              suffix=" pts."
              separator=" "
              decimal=","
              useEasing={true}
            />
            <h5 className="healthScoreCard-title text-muted">
              Promedio Health Score
            </h5>
          </div>
          <div className="svg__wrapper">
            {myAcumulatives.healthScore < 50 ? (
              <GiHealthDecrease />
            ) : (
              <GiHealthIncrease />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
