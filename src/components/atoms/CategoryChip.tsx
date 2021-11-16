import { Chip } from "@mui/material";
import useTranslate from "hooks/useTranslate";
import { Category } from "interfaces/Category";
import React, { useMemo } from "react";
import { FaAngleDoubleUp, FaAngleUp, FaAngleDown } from "react-icons/fa";

interface CategoryChipProps {
  categoryId: string;
}

const CategoryChip: React.FC<CategoryChipProps> = ({ categoryId }) => {
  const t = useTranslate();

  const categoryInfo = useMemo(() => {
    switch (categoryId) {
      case Category.LIGHT.toString():
        return {
          icon: <FaAngleDown />,
          label: t("category.light"),
        };
      case Category.MEDIUM.toString():
        return {
          icon: <FaAngleUp />,
          label: t("category.medium"),
        };
      case Category.HEAVY.toString():
      default:
        return {
          icon: <FaAngleDoubleUp />,
          label: t("category.heavy"),
        };
    }
  }, [categoryId, t]);

  return <Chip icon={categoryInfo.icon} label={categoryInfo.label} />;
};

export default CategoryChip;
