import { defineComponent } from "vue";
import type { PropType } from "vue";
import type { IMenuItem } from "./type";
import { Menu, MenuItem, SubMenu } from "ant-design-vue";
import { default as Icon } from "@ant-design/icons-vue";
import * as icons from "@ant-design/icons-vue";
import { HddFilled } from "@ant-design/icons-vue";
import './style/index.less'

export default defineComponent({
  props: {
    data: Array as PropType<IMenuItem[]>,
  },
  setup: (props, { attrs }) => {
    const renderMenu = (data: IMenuItem[] = []) => {
      return data.map(({ id, icon, text, children }) => {
        const slots = {
          icon: () => {
            debugger;
            const _icon = icon && (icons as any)[icon!];
            return (
              <>
                <span>
                  {_icon && (
                    <Icon component={_icon} style={{ marginRight: "8px" }} />
                  )}
                </span>
              </>
            );
          },
          title: () => {
            return (
              <>
                <h3>{text}</h3>
              </>
            );
          },
        };

        if (children && children.length) {
          return (
            <>
              <SubMenu key={id} v-slots={slots}>
                {renderMenu(children)}
              </SubMenu>
            </>
          );
        }

        return (
          <>
            <MenuItem key={id} v-slots={slots}>
              {text}
            </MenuItem>
          </>
        );
      });
    };

    return () => {
      return (
        <Menu mode="inline" {...attrs}>
          {renderMenu(props.data)}
        </Menu>
      );
    };
  },
});
